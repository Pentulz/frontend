import type { FetchError } from "ofetch";

export type ValidationError = FetchError<{
  detail: [
    {
      type: string | "missing";
      msg: string;
      loc: string[];
    },
  ];
}>;

export type ClientError = FetchError<{
  errors: [
    {
      status: string | "400";
      title: string;
      detail: string;
    },
  ];
}>;

// JSON api typing
type PlatformType = "WINDOWS" | "MACOS" | "LINUX";

type ArgumentTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
};

type TypedArgumentDefinition<
  K extends keyof ArgumentTypeMap = keyof ArgumentTypeMap,
> = {
  name: string;
  type: K;
  required: boolean;
  description: string;
  placeholder: string;
  default_value?: ArgumentTypeMap[K] | null;
};

type ToolVariant = {
  args: string[];
  description: string;
  argument_definitions: TypedArgumentDefinition[];
};

export type SystemTool = {
  name: string;
  cmd: string;
  export_format: string;
  export_arguments: string[];
  version_arg: string;
  variants: ToolVariant[];
};

export type SystemToolCollectionDocument = {
  data: Array<{
    type: "tools";
    attributes: SystemTool;
  }>;
};

export type Results = {
  period?: string;
  summary?: string;
  status?: string;
  warnings?: number;
  risk_level?: string;
  total_scans?: number;
  recommendations?: string[];
  vulnerabilities_found?: number;
  healthy_systems?: number;
  performance_metrics?: {
    average_cpu?: string;
    average_memory?: string;
    network_latency?: string;
  };
};

type ResourceMap = {
  tools: {
    cmd: string;
    args: string[];
  } & Partial<{
    version?: string;
  }>;
  agents: {
    id: string;
    description: string;
    token: string;
    last_seen_at: Date;
    created_at: Date;
    jobs: Ref<"jobs">[];
  } & Partial<{
    hostname: string;
    platform: PlatformType;
    available_tools: Ref<"tools">[];
  }>;
  jobs: {
    id: string;
    name: string;
    agent_id: string;
    action: unknown; // TODO: specify
  } & Partial<{
    description: string;
    started_at: Date;
    completed_at: Date;
    created_at: Date;
    results: Results;
  }>;
  reports: {
    id: string;
    results: Results;
    created_at: string;
  };
};

type RMKeys = keyof ResourceMap;

type Ref<K extends RMKeys = RMKeys> = ResourceMap[K];

type Identifier<K extends RMKeys = RMKeys> = {
  type: K;
  id: string;
};

export type Entity<K extends RMKeys = RMKeys> = Identifier<K> & {
  attributes: ResourceMap[K];
};

// JSON API documents
export type SingleDocument<K extends RMKeys = RMKeys> = {
  data: Entity<K>;
};

export type CollectionDocument<K extends RMKeys = RMKeys> = {
  data: Entity<K>[];
};

export type JsonDocument<K extends RMKeys = RMKeys> =
  | SingleDocument<K>
  | CollectionDocument<K>;

// Type guards
export function isType<K extends keyof ResourceMap>(
  r: Entity,
  t: K,
): r is Entity<K> {
  return r.type === t;
}

export function isCollectionDocument<K extends RMKeys>(
  doc: JsonDocument<K>,
): doc is CollectionDocument<K> {
  return Array.isArray(doc.data);
}

export function isSingleDocument<K extends RMKeys>(
  doc: JsonDocument<K>,
): doc is SingleDocument<K> {
  return !Array.isArray(doc.data);
}

export function isSingleDocumentOf<K extends RMKeys>(
  doc: JsonDocument,
  t: K,
): doc is SingleDocument<K> {
  return isSingleDocument(doc) && isType(doc.data, t);
}

export function isCollectionDocumentOf<K extends RMKeys>(
  doc: JsonDocument,
  t: K,
): doc is CollectionDocument<K> {
  return isCollectionDocument(doc) && doc.data.every((d) => isType(d, t));
}
