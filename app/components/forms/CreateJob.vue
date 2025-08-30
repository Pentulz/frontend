<script setup lang="ts">
import {
  PlayIcon,
  ClipboardListIcon,
  CheckIcon,
  DotIcon,
  CircleIcon,
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
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
} from "~/components/ui/select";
import { useForm, type TypedSchema } from "vee-validate";
import { stepSchemas, type MergedValues } from "./create-job-utils";
import { toast } from "vue-sonner";
import type { CollectionDocument } from "~/lib/api";

const {
  public: { apiBase },
} = useRuntimeConfig();

const agents = useFetch<CollectionDocument<"agents">>("/api/v1/agents", {
  server: false,
  lazy: true,
  baseURL: apiBase,
});

const open = ref(false);

const stepIndex = ref<1 | 2 | 3 | 4>(1);

const { meta, handleSubmit } = useForm({
  validationSchema: computed(
    () =>
      stepSchemas[stepIndex.value - 1] as unknown as TypedSchema<MergedValues>,
  ),
  keepValuesOnUnmount: true,
});

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

const onSubmit = handleSubmit((values) => {
  toast.info("submit", { action: () => console.log(values) });
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        <PlayIcon class="size-6" />
        <span>Start New Job</span>
      </Button>
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
        v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
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
                          {{ agent.attributes.hostname ?? agent.id }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>

            <template v-else-if="stepIndex === 3"> </template>

            <template v-else> </template>
          </div>

          <!-- footer action -->
          <div class="flex items-center justify-between mt-4">
            <Button
              :disabled="isPrevDisabled"
              variant="outline"
              size="sm"
              @click="prevStep()"
            >
              Back
            </Button>
            <div class="flex items-center gap-3">
              <Button
                v-if="stepIndex !== 4"
                :type="meta.valid ? 'button' : 'submit'"
                :disabled="isNextDisabled"
                size="sm"
                @click="meta.valid && nextStep()"
              >
                Next
              </Button>
              <Button v-if="stepIndex === 4" size="sm" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Stepper>
    </DialogContent>
  </Dialog>
</template>
