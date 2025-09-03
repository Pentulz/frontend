import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const schemas = [
  z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(400),
  }),
  z.object({
    agent_id: z.string().min(1).max(64),
  }),
  z.object({
    actions: z.array(z.object({ cmd: z.string().min(1).max(64) })).min(1),
  }),
  z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(400),
    agent_id: z.string().min(1).max(64),
    actions: z.array(
      z.object({
        cmd: z.string().min(1).max(64),
        variant: z.string().min(1),
        args: z.any(),
      }),
    ),
  }),
] as const satisfies readonly z.ZodTypeAny[];

type TupleKeys<T extends readonly unknown[]> = Exclude<
  keyof T,
  keyof Array<unknown>
>;

export type StepValues = {
  [I in TupleKeys<typeof schemas>]: z.infer<(typeof schemas)[I]>;
};

// Define the schema for each step of the stepper
export const stepSchemas = schemas.map((s) => toTypedSchema(s));

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type MergeRight<A, B> = Omit<A, keyof B> & B;

type ReduceRightBias<
  T extends readonly unknown[],
  Acc = object,
> = T extends readonly [infer H, ...infer R]
  ? ReduceRightBias<R, MergeRight<Acc, H>>
  : Acc;

type InferredTuple<T extends readonly z.ZodTypeAny[]> = {
  [I in keyof T]: z.infer<T[I]>;
};

type StepTuple = InferredTuple<typeof schemas>;
export type MergedValues = Prettify<ReduceRightBias<StepTuple>>;
