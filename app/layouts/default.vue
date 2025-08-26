<script setup></script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="flex flex-col h-screen">
      <header
        class="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-10"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
