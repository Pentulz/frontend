const isMathPatternPath = (pathA: string, pathB: string) => {
  const partsA = pathA.split("/");
  const partsB = pathB.split("/");

  if (partsA.length !== partsB.length) return false;

  const isMatch = partsA.every((part: string, i: number) => {
    return part === partsB[i] || part.startsWith(":");
  });

  return isMatch;
};

export type Crumb = {
  name: string;
  path?: string;
};

export const useBreadcrumbs = () => {
  const router = useRouter();
  const route = useRoute();
  const routes = router.getRoutes();

  const HOMEPAGE = { name: "Dashboard", path: "/" };

  function getBreadcrumbs(currRoute: string): Array<Crumb> {
    if (currRoute === "" || currRoute == "/") return [HOMEPAGE];

    const paths = getBreadcrumbs(
      currRoute.slice(0, currRoute.lastIndexOf("/")),
    );

    const founds = routes.filter((r) => isMathPatternPath(r.path, currRoute));

    const matchRoute =
      founds.length > 1 ? founds.find((r) => r.path === currRoute) : founds[0];

    return [
      ...paths,
      {
        path: currRoute,
        name:
          (matchRoute?.meta?.breadcrumb as string) ||
          (matchRoute?.name as string) ||
          matchRoute?.path ||
          currRoute,
      },
    ];
  }

  const breadcrumbs = computed<Array<Crumb>>(() => {
    const res = getBreadcrumbs(route.path);
    const last = res.at(res.length - 1);
    if (last) last.path = undefined;
    return res;
  });

  return {
    breadcrumbs,
  };
};
