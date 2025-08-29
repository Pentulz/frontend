<script setup lang="ts">
import type { SuccessResponse, ClientError } from "~/lib/api";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { PlusIcon, ServerIcon } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

type Response = SuccessResponse<unknown, "agents">;

const {
  public: { apiBase },
} = useRuntimeConfig();

const schema = toTypedSchema(
  z.object({
    hostname: z.string().min(1).max(50),
    description: z.string().min(1).max(400),
  }),
);

const open = ref(false);

const form = useForm({
  validationSchema: schema,
});

const body = ref<{ hostname: string; description: string } | null>(null);

const submitRequest = useFetch<Response, ClientError>(
  `${apiBase}/api/v1/agents`,
  {
    server: false,
    immediate: false,
    watch: false,
    method: "POST",
    body: body,
  },
);

const onSubmit = form.handleSubmit(async (values) => {
  submitRequest.clear();
  body.value = values;
  await submitRequest.execute();
  if (submitRequest.status.value === "success") {
    toast.success("Successfully created agent");
    open.value = false;
    navigateTo(`/agents/${submitRequest.data.value?.data.id}`);
  } else {
    toast.error("An error occured");
    console.error(submitRequest.error.value);
  }
});
</script>
<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        <PlusIcon class="h-6 w-auto" />
        <span>Add New Agent</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle
          class="flex flex-row gap-2 font-semibold items-center text-base leading-6"
        >
          <ServerIcon class="size-5" />
          Create Agent
        </DialogTitle>
        <DialogDescription>
          Create a new agent to deploy it and run jobs
        </DialogDescription>
      </DialogHeader>
      <form method="POST" class="flex flex-col gap-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="hostname">
          <FormItem>
            <FormLabel>Hostname</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter hostname"
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
                placeholder="Describe this agent"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end">
          <Button type="submit" :disabled="submitRequest.pending.value"
            >Create Agent</Button
          >
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
