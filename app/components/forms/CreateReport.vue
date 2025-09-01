<script setup lang="ts">
import {
  isSingleDocumentOf,
  isCollectionDocumentOf,
  type ClientError,
  type JsonDocument,
} from "~/lib/api";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { type Job, getStatus } from "../jobs";
import { PlusIcon, FileChartColumnIcon } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

const {
  public: { apiBase },
} = useRuntimeConfig();

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  jobs_ids: z
    .array(z.string().length(36, "One of the jobs has an invalid ID"))
    .min(1, "At least one job is needed for a report"),
});

const schema = toTypedSchema(bodySchema);

type Body = z.infer<typeof bodySchema>;

const form = useForm({
  validationSchema: schema,
});

const body = ref<Body | null>(null);
const open = ref(false);

const submitRequest = useFetch<JsonDocument, ClientError>("/api/v1/reports", {
  server: false,
  immediate: false,
  watch: false,
  method: "POST",
  baseURL: apiBase,
  body: body,
});

const jobsDocument = useFetch<JsonDocument>("/api/v1/jobs", {
  server: false,
  lazy: true,
  baseURL: apiBase,
});

const jobs = computed<Job[]>(() => {
  if (!isCollectionDocumentOf(jobsDocument.data.value, "jobs")) return [];

  return jobsDocument.data.value.data
    .map(
      ({
        id,
        attributes: { created_at, completed_at, started_at, ...rest },
      }) => {
        const startedAt = started_at ? new Date(started_at) : undefined;
        const completedAt = completed_at ? new Date(completed_at) : undefined;

        return {
          ...rest,
          id,
          created_at: created_at ? new Date(created_at) : undefined,
          completed_at: completedAt,
          started_at: startedAt,
          status: getStatus(startedAt, completedAt),
        };
      },
    )
    .filter(({ status }) => status === "Completed");
});

const onSubmit = form.handleSubmit(async (values) => {
  const { clear, execute } = submitRequest;
  clear();
  body.value = values;
  await execute();

  const {
    status: { value: status },
    data: { value: data },
    error: { value: error },
  } = submitRequest;

  if (status === "success" && data) {
    if (!isSingleDocumentOf(data, "reports")) {
      toast.error("Unexpected response");
      console.error("Expected a document, got the following instead");
      console.error(data);
      return;
    }

    toast.success("Successfully created report");
    open.value = false;
    navigateTo(`/reports/${data.data.id}`);
    return;
  }

  if (error) {
    if (error.data) {
      error.data.errors.forEach((err) =>
        toast.error(err.status, { description: err.title }),
      );
      console.error(error.data);
    }

    if (error.statusCode && error.statusCode >= 500) {
      toast.error("Backend error", {
        description: `${error.statusCode} ${error.message}`,
      });
    }
  }
});
</script>
<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        <PlusIcon class="h-6 w-auto" />
        <span>Generate New Report</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle
          class="flex flex-row gap-2 font-semibold items-center text-base leading-6"
        >
          <FileChartColumnIcon class="size-5" />
          Create New Report
        </DialogTitle>
        <DialogDescription>
          Create a new report to analyze and merge jobs
        </DialogDescription>
      </DialogHeader>
      <form method="POST" class="flex flex-col gap-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe this report"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="jobs_ids">
          <FormItem>
            <FormLabel>Select jobs</FormLabel>
            <FormControl>
              <Select v-bind="componentField" multiple>
                <SelectTrigger class="w-full max-w-full overflow-hidden">
                  <SelectValue
                    placeholder="Select jobs to include"
                    class="wrap-break-word"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="job in jobs" :key="job.id" :value="job.id">
                    {{ job.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end">
          <Button type="submit" :disabled="submitRequest.pending.value"
            >Create Report</Button
          >
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
