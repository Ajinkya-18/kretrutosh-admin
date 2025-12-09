import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"; // REMOVED
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import authProvider from "./authProvider";
import { supabaseClient } from "./utility";
import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2, AuthPage } from "@refinedev/antd";
import { PageList } from "./pages/pages/list";
import { PageCreate } from "./pages/pages/create";
import { PageEdit } from "./pages/pages/edit";

import { VideoList } from "./pages/videos/list";
import { VideoCreate } from "./pages/videos/create";
import { VideoEdit } from "./pages/videos/edit";
import { CaseStudyList } from "./pages/case_studies/list";
import { CaseStudyCreate } from "./pages/case_studies/create";
import { CaseStudyEdit } from "./pages/case_studies/edit";
import { ClientLogoList } from "./pages/client_logos/list";
import { ClientLogoCreate } from "./pages/client_logos/create";
import { ClientLogoEdit } from "./pages/client_logos/edit";
import { BlogList } from "./pages/blogs/list";
import { BlogCreate } from "./pages/blogs/create";
import { BlogEdit } from "./pages/blogs/edit";
import { AssessmentList } from "./pages/assessments/list";
import { AssessmentCreate } from "./pages/assessments/create";
import { AssessmentEdit } from "./pages/assessments/edit";
import { TestimonialList } from "./pages/testimonials/list";
import { TestimonialCreate } from "./pages/testimonials/create";
import { TestimonialEdit } from "./pages/testimonials/edit";

import { FrameworkList } from "./pages/frameworks/list";
import { FrameworkCreate } from "./pages/frameworks/create";
import { FrameworkEdit } from "./pages/frameworks/edit";

import { WhitepaperList } from "./pages/whitepapers/list";
import { WhitepaperCreate } from "./pages/whitepapers/create";
import { WhitepaperEdit } from "./pages/whitepapers/edit";

import { IndustryList } from "./pages/industries/list";
import { IndustryCreate } from "./pages/industries/create";
import { IndustryEdit } from "./pages/industries/edit";

import { WebsiteContentList } from "./pages/website_content/list";
import { WebsiteContentCreate } from "./pages/website_content/create";
import { WebsiteContentEdit } from "./pages/website_content/edit";

import { SectionsHomeList } from "./pages/sections_home/list";
import { SectionsHomeEdit } from "./pages/sections_home/edit";
import { SectionsHomeCreate } from "./pages/sections_home/create";

import { SectionsAboutList } from "./pages/sections_about/list";
import { SectionsAboutCreate } from "./pages/sections_about/create";
import { SectionsAboutEdit } from "./pages/sections_about/edit";

import { SectionsContactList } from "./pages/sections_contact/list";
import { SectionsContactCreate } from "./pages/sections_contact/create";
import { SectionsContactEdit } from "./pages/sections_contact/edit";

import { SectionsServicesList } from "./pages/sections_services/list";
import { SectionsServicesCreate } from "./pages/sections_services/create";
import { SectionsServicesEdit } from "./pages/sections_services/edit";

import { SectionsIndustriesList } from "./pages/sections_industries/list";
import { SectionsIndustriesCreate } => "./pages/sections_industries/create";
import { SectionsIndustriesEdit } from "./pages/sections_industries/edit";

// Start App
function App() {
  console.log("App.tsx: App component rendering");
  
  return (
    // <RefineKbarProvider>  <-- REMOVED
      <DevtoolsProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerBindings}
          notificationProvider={useNotificationProvider}
          resources={[
          {
            name: "website_content",
            list: "/website-content",
            create: "/website-content/create",
            edit: "/website-content/edit/:id",
            meta: { label: "Site Text & Labels" }
          },
          {
            name: "pages",
            list: "/pages",
            edit: "/pages/edit/:id",
            meta: { label: "Page Banners" }
          },
          {
            name: "sections_home",
            list: "/sections_home",
            edit: "/sections_home/edit/:id",
            create: "/sections_home/create",
            meta: { label: "Home Page Builder" }
          },
          {
            name: "sections_about",
            list: "/sections_about",
            edit: "/sections_about/edit/:id",
            create: "/sections_about/create",
            meta: { label: "About Page Builder" }
          },
          {
            name: "sections_contact",
            list: "/sections_contact",
            edit: "/sections_contact/edit/:id",
            create: "/sections_contact/create",
            meta: { label: "Contact Page Builder" }
          },
          {
            name: "sections_services",
            list: "/sections_services",
            edit: "/sections_services/edit/:id",
            create: "/sections_services/create",
            meta: { label: "Service Page Builder" }
          },
          {
            name: "sections_industries",
            list: "/sections_industries",
            edit: "/sections_industries/edit/:id",
            create: "/sections_industries/create",
            meta: { label: "Industry Page Builder" }
          },
          {
            name: "blogs",
            list: "/blogs",
            create: "/blogs/create",
            edit: "/blogs/edit/:id",
            meta: { label: "Blogs" }
          },
          {
            name: "videos",
            list: "/videos",
            create: "/videos/create",
            edit: "/videos/edit/:id",
            meta: { label: "Videos" }
          },
          {
            name: "whitepapers",
            list: "/whitepapers",
            create: "/whitepapers/create",
            edit: "/whitepapers/edit/:id",
            meta: { label: "Whitepapers" }
          },
          {
            name: "frameworks",
            list: "/frameworks",
            create: "/frameworks/create",
            edit: "/frameworks/edit/:id",
            meta: { label: "Frameworks" }
          },
          {
            name: "case_studies",
            list: "/case_studies",
            create: "/case_studies/create",
            edit: "/case_studies/edit/:id",
            meta: { label: "Case Studies" }
          },
          {
            name: "client_logos",
            list: "/client_logos",
            create: "/client_logos/create",
            edit: "/client_logos/edit/:id",
            meta: { label: "Client Logos" }
          },
          {
            name: "sections_home",
            list: "/sections_home",
            edit: "/sections_home/edit/:id",
            create: "/sections_home/create",
            meta: { label: "Home Page Builder" }
          },
          {
            name: "industries",
            list: "/industries",
            create: "/industries/create",
            edit: "/industries/edit/:id",
            meta: { label: "Industries" }
          }
        ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "3l839q-Az01rW-Pdt2jC",
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-outer"
                  fallback={<Outlet />}
                >
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    title={
                      <ThemedTitleV2
                        collapsed={false}
                        text="Kretrutosh Admin"
                      />
                    }
                    providers={[
                      {
                        name: "google",
                        label: "Sign in with Google",
                      },
                      {
                        name: "github",
                        label: "Sign in with GitHub",
                      },
                    ]}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated
                  key="authenticated-inner"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutV2
                    Title={({ collapsed }: { collapsed: boolean }) => (
                      <ThemedTitleV2
                        collapsed={collapsed}
                        text="Kretrutosh Admin"
                      />
                    )}
                    Sider={(props: any) => <ThemedSiderV2 {...props} fixed />}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="pages" />}
              />
              <Route path="/pages">
                <Route index element={<PageList />} />
                <Route path="create" element={<PageCreate />} />
                <Route path="edit/:id" element={<PageEdit />} />
              </Route>

              <Route path="/website-content">
                <Route index element={<WebsiteContentList />} />
                <Route path="create" element={<WebsiteContentCreate />} />
                <Route path="edit/:id" element={<WebsiteContentEdit />} />
              </Route>

              <Route path="/videos">
                  <Route index element={<VideoList />} />
                  <Route path="create" element={<VideoCreate />} />
                  <Route path="edit/:id" element={<VideoEdit />} />
              </Route>

              <Route path="/blogs">
                  <Route index element={<BlogList />} />
                  <Route path="create" element={<BlogCreate />} />
                  <Route path="edit/:id" element={<BlogEdit />} />
              </Route>

              <Route path="/case_studies">
                  <Route index element={<CaseStudyList />} />
                  <Route path="create" element={<CaseStudyCreate />} />
                  <Route path="edit/:id" element={<CaseStudyEdit />} />
              </Route>

              <Route path="/client_logos">
                  <Route index element={<ClientLogoList />} />
                  <Route path="create" element={<ClientLogoCreate />} />
                  <Route path="edit/:id" element={<ClientLogoEdit />} />
              </Route>

              <Route path="/assessments">
                  <Route index element={<AssessmentList />} />
                  <Route path="create" element={<AssessmentCreate />} />
                  <Route path="edit/:id" element={<AssessmentEdit />} />
              </Route>

              <Route path="/testimonials">
                  <Route index element={<TestimonialList />} />
                  <Route path="create" element={<TestimonialCreate />} />
                  <Route path="edit/:id" element={<TestimonialEdit />} />
              </Route>

              <Route path="/frameworks">
                  <Route index element={<FrameworkList />} />
                  <Route path="create" element={<FrameworkCreate />} />
                  <Route path="edit/:id" element={<FrameworkEdit />} />
              </Route>

              <Route path="/whitepapers">
                  <Route index element={<WhitepaperList />} />
                  <Route path="create" element={<WhitepaperCreate />} />
                  <Route path="edit/:id" element={<WhitepaperEdit />} />
              </Route>

              <Route path="/industries">
                  <Route index element={<IndustryList />} />
                  <Route path="create" element={<IndustryCreate />} />
                  <Route path="edit/:id" element={<IndustryEdit />} />
              </Route>

              <Route path="/sections_home">
                  <Route index element={<SectionsHomeList />} />
                  <Route path="create" element={<SectionsHomeCreate />} />
                  <Route path="edit/:id" element={<SectionsHomeEdit />} />
              </Route>

              <Route path="*" element={<CatchAllNavigate to="/pages" />} />
            </Route>
          </Routes>

          {/* <RefineKbar /> */} 
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    // </RefineKbarProvider>
  );
}

export default App;