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
  id: string;
  name: string;
  description: string;
  arguments: string[];
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

export type ReportResult = {
  metadata: {
    name: string;
    report_id: string;
    created_at: string;
    total_jobs: number;
    total_findings: number;
  };

  summary: {
    tools_used: string[];
    total_findings: number;
    severity_distribution: {
      info: number;
      low: number;
      medium: number;
      high: number;
      critical: number;
    };
  };

  finding_by_tool: {
    [key: string]: {
      tool_name: string;
      jobs_count: number;
      finding: unknown[];
      statistics: { [key: string]: unknown };
    };
  };

  all_findings: unknown[];
};

type ResourceMap = {
  tools: {
    cmd: string;
    args: string[];
    version?: string;
  };
  agents: {
    name: string;
    description: string;
    token: string;
    last_seen_at: string;
    created_at: string;
    jobs: (Ref<"jobs"> & { id: string })[];
    available_tools: Ref<"tools">[];
  } & Partial<{
    hostname: string;
    platform: PlatformType;
  }>;
  jobs: {
    id?: string;
    name: string;
    description: string;
    agent_id: string;
    action: {
      cmd: string;
      variant?: string;
      args: string[];
    };
    // ISO 8601 / RFC 3339 date
    started_at?: string;
    completed_at?: string;
    created_at?: string;
    results: unknown;
    // Whether the job is successful (only if completed_at is set)
    success?: boolean;
  };
  reports: {
    name: string;
    description: string;
    results: ReportResult;
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

export function isJsonDocument(doc: unknown): doc is JsonDocument {
  if (!doc) return false;

  if (typeof doc !== "object") return false;

  if (!("data" in doc)) return false;

  if (typeof doc.data !== "object") return false;

  return true;
}

export function isCollectionDocument(doc: unknown): doc is CollectionDocument {
  return isJsonDocument(doc) && Array.isArray(doc.data);
}

export function isSingleDocument(doc: unknown): doc is SingleDocument {
  return isJsonDocument(doc) && !Array.isArray(doc.data);
}

export function isSingleDocumentOf<K extends RMKeys>(
  doc: unknown,
  t: K,
): doc is SingleDocument<K> {
  return isSingleDocument(doc) && isType(doc.data, t);
}

export function isCollectionDocumentOf<K extends RMKeys>(
  doc: unknown,
  t: K,
): doc is CollectionDocument<K> {
  return isCollectionDocument(doc) && doc.data.every((d) => isType(d, t));
}
