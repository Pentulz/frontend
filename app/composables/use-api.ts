import type { JsonDocument, ClientError, Entity, RMKeys } from "~/lib/api";
import { isSingleDocumentOf, isCollectionDocumentOf } from "~/lib/api";

// Types
export type Agent = Omit<
  Entity<"agents">["attributes"],
  "last_seen_at" | "created_at"
> & { id: string; last_seen_at?: Date; created_at?: Date };

export type Job = {
  id: string;
  started_at?: Date;
  completed_at?: Date;
  created_at?: Date;
  status: "Completed" | "Running" | "Pending";
} & Omit<
  Entity<"jobs">["attributes"],
  "started_at" | "completed_at" | "created_at"
>;

export type Report = Omit<Entity<"reports">["attributes"], "created_at"> & {
  id: string;
  created_at?: Date;
};

// Helpers

export const getStatus = (
  startedAt?: Date,
  completedAt?: Date,
): Job["status"] => {
  if (completedAt) return "Completed";
  if (startedAt) return "Running";
  return "Pending";
};

// Composables

export const useApiRequest = (url: string) => {
  const {
    public: { apiBase: baseURL },
  } = useRuntimeConfig();

  return useFetch<JsonDocument, ClientError>(url, {
    baseURL,
    server: false,
  });
};

export const useCollectionDocumentOf = <K extends RMKeys>(
  url: string,
  kind: K,
) => {
  const request = useApiRequest(url);

  const doc = computed(() =>
    request.data.value && isCollectionDocumentOf(request.data.value, kind)
      ? request.data.value
      : undefined,
  );

  return {
    request,
    doc,
  };
};

export const useSingleDocumentOf = <K extends RMKeys>(url: string, kind: K) => {
  const request = useApiRequest(url);

  const doc = computed(() =>
    request.data.value && isSingleDocumentOf(request.data.value, kind)
      ? request.data.value
      : undefined,
  );

  return {
    request,
    doc,
  };
};

export const useReports = () => {
  const { request, doc } = useCollectionDocumentOf(
    "/api/v1/reports",
    "reports",
  );

  const reports = computed(() => {
    if (!doc.value) return [];

    return doc.value.data.map<Report>(
      ({ id, attributes: { created_at, ...rest } }) => ({
        ...rest,
        id,
        created_at: created_at ? new Date(created_at) : undefined,
      }),
    );
  });

  return { request, doc, reports };
};

export const useAgents = () => {
  const { request, doc } = useCollectionDocumentOf("/api/v1/agents", "agents");

  const agents = computed(() => {
    if (!doc.value) return [];

    return doc.value.data.map<Agent>(
      ({ id, attributes: { created_at, last_seen_at, ...rest } }) => ({
        ...rest,
        id,
        created_at: created_at ? new Date(created_at) : undefined,
        last_seen_at: last_seen_at ? new Date(last_seen_at) : undefined,
      }),
    );
  });

  return { request, doc, agents };
};

export const useAgent = (id: string) => {
  const { request, doc } = useSingleDocumentOf(
    `/api/v1/agents/${id}`,
    "agents",
  );

  const agent = computed(() => {
    if (!doc.value) return undefined;

    const {
      id,
      attributes: { created_at, last_seen_at, ...rest },
    } = doc.value.data;

    return {
      ...rest,
      id,
      created_at: created_at ? new Date(created_at) : undefined,
      last_seen_at: last_seen_at ? new Date(last_seen_at) : undefined,
    };
  });

  return { request, doc, agent };
};

export const useJobs = () => {
  const { request, doc } = useCollectionDocumentOf("/api/v1/jobs", "jobs");

  const jobs = computed(() => {
    if (!doc.value) return [];

    return doc.value.data.map<Job>(
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
    );
  });

  return { request, doc, jobs };
};
