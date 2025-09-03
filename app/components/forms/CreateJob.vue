<script setup lang="ts">
import {
  ClipboardListIcon,
  CheckIcon,
  DotIcon,
  CircleIcon,
  XIcon,
} from "lucide-vue-next";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "~/components/ui/dialog";
import {
  FormField,
  FormFieldArray,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "~/components/ui/stepper";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectItemText,
} from "~/components/ui/select";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useForm, type FieldEntry, type TypedSchema } from "vee-validate";
import { stepSchemas, type MergedValues } from "./create-job-utils";
import { toast } from "vue-sonner";
import { Checkbox } from "~/components/ui/checkbox";
import {
  type CollectionDocument,
  type SystemToolCollectionDocument,
  type SystemTool,
  type SingleDocument,
  isSingleDocumentOf,
} from "~/lib/api";

const { agentId = undefined } = defineProps<{ agentId?: string }>();

const {
  public: { apiBase },
} = useRuntimeConfig();

const steps = [
  {
    step: 1,
    title: "Job Details",
    description: "Provide the job name and description.",
  },
  {
    step: 2,
    title: "Select Agent",
    description: "Choose which agent should execute the job.",
  },
  {
    step: 3,
    title: "Select Tools",
    description: "Select which tools should be used",
  },
  {
    step: 4,
    title: "Configure Tools",
    description: "Configure each selected tool",
  },
] as const;

const agents = useFetch<CollectionDocument<"agents">>("/api/v1/agents", {
  server: false,
  lazy: true,
  baseURL: apiBase,
});

const tools = useFetch<SystemToolCollectionDocument>("/api/v1/tools", {
  server: false,
  lazy: true,
  baseURL: apiBase,
});

const open = ref(false);

const stepIndex = ref<1 | 2 | 3 | 4>(1);

const isCreating = ref<boolean>(false);

const { handleSubmit, values, validate, meta, resetForm } = useForm({
  validationSchema: computed(
    () =>
      stepSchemas[stepIndex.value - 1] as unknown as TypedSchema<MergedValues>,
  ),
  keepValuesOnUnmount: true,
  initialValues: {
    agent_id: agentId,
  },
});

const onSubmit = handleSubmit(
  async ({ name, description, agent_id, actions }) => {
    isCreating.value = true;
    const results = await Promise.all(
      actions.map(async (v) =>
        $fetch("/api/v1/jobs", {
          method: "POST",
          baseURL: apiBase,
          body: {
            name,
            description,
            agent_id,
            action: {
              cmd: v.cmd,
              variant: v.variant,
              args: v.args,
            },
          },
        }),
      ),
    );

    isCreating.value = false;

    const [passed, failed] = results.reduce<
      [SingleDocument<"jobs">[], unknown[]]
    >(
      ([pass, fail], cur) =>
        isSingleDocumentOf(cur, "jobs")
          ? [[...pass, cur], fail]
          : [pass, [...fail, cur]],
      [[], []],
    );

    if (failed.length) {
      toast.error(`Failed to create ${failed.length} jobs`);
    }

    passed.forEach((job) =>
      toast.success("Successfully created job", { description: job.data.id }),
    );

    if (passed.length) {
      open.value = false;
      resetForm();
      stepIndex.value = 1;
      navigateTo(`/jobs/${passed.at(0)?.data.id}`);
    }
  },
);

const toolMap = computed<{ [key: string]: SystemTool }>(
  () =>
    tools.data.value?.data.reduce(
      (acc, cur) => ({ [cur.attributes.cmd]: cur.attributes, ...acc }),
      {},
    ) ?? {},
);
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle
          class="flex flex-row gap-2 font-semibold items-center text-base leading-6"
        >
          <ClipboardListIcon class="size-5" />
          Create Job
        </DialogTitle>
        <DialogDescription>
          Create a new job to execute on an agent.
        </DialogDescription>
      </DialogHeader>

      <Stepper
        v-slot="{ isPrevDisabled, nextStep, prevStep, isLastStep, isFirstStep }"
        v-model="stepIndex"
        orientation="vertical"
        as-child
      >
        <form class="flex flex-col gap-4" @submit="onSubmit">
          <!-- stepper visual -->
          <div class="flex w-full flex-col gap-2">
            <StepperItem
              v-for="step in steps"
              :key="step.step"
              v-slot="{ state }"
              class="relative flex w-full items-start gap-6"
              :step="step.step"
              :disabled="step.step > stepIndex && meta.valid"
            >
              <StepperSeparator
                v-if="step.step !== steps[steps.length - 1]?.step"
                class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
              />
              <StepperTrigger as-child>
                <Button
                  :variant="
                    state === 'completed' || state === 'active'
                      ? 'default'
                      : 'outline'
                  "
                  :disabled="step.step > stepIndex"
                  type="button"
                  size="icon"
                  class="z-10 rounded-full shrink-0"
                  :class="[
                    state === 'active' &&
                      'ring-2 ring-ring ring-offset-2 ring-offset-background',
                  ]"
                >
                  <CheckIcon v-if="state === 'completed'" class="size-5" />
                  <CircleIcon v-if="state === 'active'" />
                  <DotIcon v-if="state === 'inactive'" />
                </Button>
              </StepperTrigger>
              <div class="flex flex-col gap-1">
                <StepperTitle
                  :class="[state === 'active' && 'text-primary']"
                  class="text-sm font-semibold transition lg:text-base"
                >
                  {{ step.title }}
                </StepperTitle>
                <StepperDescription
                  :class="[state === 'active' && 'text-primary']"
                  class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                >
                  {{ step.description }}
                </StepperDescription>
              </div>
            </StepperItem>
          </div>

          <!-- form content -->
          <div class="flex flex-col gap-4">
            <template v-if="stepIndex === 1">
              <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                  <FormLabel>Job Name</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="description">
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>

            <template v-else-if="stepIndex === 2">
              <FormField v-slot="{ componentField }" name="agent_id">
                <FormItem>
                  <FormLabel>Available Agents</FormLabel>
                  <FormControl>
                    <Select v-bind="componentField">
                      <SelectTrigger class="w-full">
                        <SelectValue
                          placeholder="Choose an agent to run this job"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="agent in agents.data.value?.data"
                          :key="agent.id"
                          :value="agent.id"
                        >
                          {{ agent.attributes.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>

            <template v-else-if="stepIndex === 3">
              <FormFieldArray v-slot="{ fields, push, remove }" name="actions">
                <FormField name="actions">
                  <FormItem>
                    <FormLabel>Available tools</FormLabel>
                    <FormControl>
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <Button
                          v-for="i in agents.data.value?.data.find(
                            (v) => v.id === values.agent_id,
                          )?.attributes.available_tools"
                          :key="i.cmd"
                          type="button"
                          :disabled="!toolMap[i.cmd]"
                          @click="() => push({ cmd: i.cmd })"
                        >
                          {{ i.cmd }}
                        </Button>
                        <div
                          v-if="
                            !agents.data.value?.data.find(
                              (v) => v.id === values.agent_id,
                            )?.attributes.available_tools?.length
                          "
                          class="lg:col-span-2 text-red-500"
                        >
                          No tools available for this host
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <ScrollArea class="bg-muted rounded-lg">
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 h-36">
                    <div
                      v-if="!fields.length"
                      class="lg:col-span-2 grid items-center justify-center text-muted-foreground"
                    >
                      Please select at least one tool
                    </div>
                    <FormField
                      v-for="(field, idx) in fields"
                      :key="field.key"
                      :name="`actions[${idx}]`"
                    >
                      <FormItem>
                        <FormControl>
                          <div
                            class="flex flex-row items-center justify-between rounded-md border shadow-sm p-2 h-fit bg-white"
                          >
                            <span class="pl-2">{{
                              (field.value as { cmd: string }).cmd
                            }}</span>
                            <Button
                              variant="default"
                              size="icon"
                              @click="() => remove(idx)"
                            >
                              <XIcon class="size-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                  </div>
                </ScrollArea>
              </FormFieldArray>
            </template>

            <template v-else>
              <ScrollArea class="max-h-[50dvh]">
                <FormFieldArray v-slot="{ fields }" name="actions">
                  <div class="flex flex-col gap-4">
                    <FormField name="actions">
                      <div
                        v-for="(field, idx) in fields as FieldEntry<{
                          cmd: string;
                          variant?: string;
                          args: { [key: string]: unknown };
                        }>[]"
                        :key="field.key"
                      >
                        <FormField :name="`actions[${idx}]`">
                          <FormItem>
                            <FormLabel
                              >Configuration for
                              {{ field.value.cmd }}</FormLabel
                            >
                            <FormControl>
                              <div
                                class="border rounded-lg bg-muted px-4 py-3 flex flex-col gap-2"
                              >
                                <template v-if="toolMap[field.value.cmd]">
                                  <!-- Choose Mode/Variant -->
                                  <FormField
                                    v-slot="{ componentField }"
                                    :name="`actions[${idx}].variant`"
                                  >
                                    <FormItem>
                                      <FormLabel>Mode</FormLabel>
                                      <FormControl>
                                        <Select v-bind="componentField">
                                          <SelectTrigger
                                            class="w-full bg-white"
                                          >
                                            <SelectValue
                                              placeholder="Choose a configuration mode"
                                            >
                                              {{
                                                componentField.modelValue
                                                  ? toolMap[
                                                      field.value.cmd
                                                    ]?.variants.find(
                                                      (v) =>
                                                        v.id ===
                                                        componentField.modelValue,
                                                    )?.name
                                                  : "Choose a configuration mode"
                                              }}
                                            </SelectValue>
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem
                                              v-for="variant in toolMap[
                                                field.value.cmd
                                              ]?.variants ?? []"
                                              :key="variant.id"
                                              :value="variant.id"
                                            >
                                              <div
                                                class="flex flex-col items-start gap-1"
                                              >
                                                <SelectItemText>
                                                  {{ variant.name }}
                                                </SelectItemText>
                                                <span
                                                  class="text-sm text-muted-foreground"
                                                  >{{
                                                    variant.description
                                                  }}</span
                                                >
                                              </div>
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                    </FormItem>
                                  </FormField>

                                  <div
                                    v-if="field.value.variant"
                                    class="flex flex-col gap-2"
                                  >
                                    <FormField
                                      v-for="argDef in toolMap[
                                        field.value.cmd
                                      ]?.variants.find(
                                        (v) => v.id == field.value.variant,
                                      )?.argument_definitions"
                                      :key="argDef.name"
                                      v-slot="{ componentField }"
                                      :name="`actions[${idx}].args.${argDef.name}`"
                                      as-child
                                    >
                                      <div>
                                        <FormItem>
                                          <FormLabel>{{
                                            argDef.name
                                          }}</FormLabel>
                                          <FormControl>
                                            <Input
                                              v-if="argDef.type === 'string'"
                                              type="text"
                                              v-bind="componentField"
                                              class="bg-white"
                                              :placeholder="argDef.placeholder"
                                              :required="argDef.required"
                                            />
                                            <Input
                                              v-else-if="
                                                argDef.type === 'number'
                                              "
                                              type="number"
                                              class="bg-white"
                                              v-bind="componentField"
                                              :placeholder="argDef.placeholder"
                                              :required="argDef.required"
                                            />
                                            <Checkbox
                                              v-else-if="
                                                argDef.type === 'boolean'
                                              "
                                              v-bind="componentField"
                                              :required="argDef.required"
                                            />
                                          </FormControl>
                                          <FormDescription
                                            v-if="argDef.description"
                                            >{{
                                              argDef.description
                                            }}</FormDescription
                                          >
                                        </FormItem>
                                      </div>
                                    </FormField>
                                  </div>
                                </template>

                                <span v-else
                                  >No configuration available for
                                  {{ field.value.cmd }}</span
                                >
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>
                      </div>
                    </FormField>
                  </div>
                </FormFieldArray>
              </ScrollArea>
            </template>
          </div>

          <!-- footer action -->
          <div
            class="flex items-center justify-between has-[>*:only-child]:justify-end mt-4"
          >
            <Button
              v-if="!isFirstStep"
              :disabled="isPrevDisabled"
              variant="outline"
              size="sm"
              type="button"
              @click="() => prevStep()"
            >
              Back
            </Button>

            <Button
              v-if="!isLastStep"
              type="button"
              size="sm"
              @click="async () => (await validate()).valid && nextStep()"
            >
              Next
            </Button>
            <Button v-if="isLastStep" size="sm" type="submit"> Submit </Button>
          </div>
        </form>
      </Stepper>
    </DialogContent>
  </Dialog>
</template>
