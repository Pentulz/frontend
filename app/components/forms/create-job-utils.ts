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
    actions: z.array(z.object({ name: z.string().min(1).max(64) })).min(1),
  }),
  z.object({
    actions: z.array(
      z.object({
        name: z.string().min(1).max(64),
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

type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => unknown : never
) extends (x: infer I) => unknown
  ? I
  : never;

type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Final type once we submit the form
export type MergedValues = Prettify<
  UnionToIntersection<StepValues[keyof StepValues]>
>;
