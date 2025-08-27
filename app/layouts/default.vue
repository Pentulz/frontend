<script setup>
const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="flex flex-col h-dvh">
      <header
        class="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-10"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <template
              v-for="crumb in breadcrumbs"
              :key="crumb.name + crumb.path || ''"
            >
              <template v-if="crumb.path">
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink as-child>
                    <NuxtLink :to="crumb.path">{{ crumb.name }}</NuxtLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
              </template>

              <BreadcrumbItem v-else>
                <BreadcrumbPage>{{ crumb.name }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <ScrollArea class="flex-1 min-h-0">
        <slot />
      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
</template>
