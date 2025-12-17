import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { ConfigProvider, theme as antdTheme } from "antd";

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

// NEW RESOURCES
import { ServiceList } from "./pages/services/list";
import { ServiceCreate } from "./pages/services/create";
import { ServiceEdit } from "./pages/services/edit";

import { ConfigNavbarList } from "./pages/config_navbar/list";
import { ConfigNavbarEdit } from "./pages/config_navbar/edit";

import { ConfigFooterList } from "./pages/config_footer/list";
import { ConfigFooterEdit } from "./pages/config_footer/edit";

import { PageHomeList } from "./pages/page_home/list";
import { PageHomeEdit } from "./pages/page_home/edit";

import { PageAboutList } from "./pages/page_about/list";
import { PageAboutEdit } from "./pages/page_about/edit";

import { PageContactList } from "./pages/page_contact/list";
import { PageContactEdit } from "./pages/page_contact/edit";

import { BookList } from "./pages/book/list";
import { BookCreate } from "./pages/book/create";
import { BookEdit } from "./pages/book/edit";

import { OutcomeList } from "./pages/outcomes/list";
import { OutcomeCreate } from "./pages/outcomes/create";
import { OutcomeEdit } from "./pages/outcomes/edit";


import { UIComponentsList } from "./pages/ui_components/list";
import { UIComponentsCreate } from "./pages/ui_components/create";
import { UIComponentsEdit } from "./pages/ui_components/edit";
import { PagesList } from "./pages/pages/list";
import { PagesEdit } from "./pages/pages/edit";


// Start App
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF9933',        // Saffron for primary buttons, links
          colorLink: '#FF9933',           // Saffron for links
          colorBgLayout: '#F3F4F6',       // Light gray background
          colorBgContainer: '#FFFFFF',    // White for cards/containers
          fontFamily: 'Inter, sans-serif', // Premium font stack
        },
        components: {
          Layout: {
            siderBg: '#0B1C3E',           // Navy sidebar
            headerBg: '#FFFFFF',          // White header
            bodyBg: '#F3F4F6',            // Light gray body
          },
          Menu: {
            darkItemBg: '#0B1C3E',        // Navy menu background
            darkItemSelectedBg: '#FF9933', // Saffron selected item
            darkItemHoverBg: 'rgba(255, 153, 51, 0.1)', // Saffron hover (10% opacity)
            darkItemColor: '#FFFFFF',      // White text
            darkItemSelectedColor: '#FFFFFF', // White selected text
          },
          Button: {
            colorPrimary: '#FF9933',       // Saffron primary buttons
            colorPrimaryHover: '#FF9933DD', // Saffron hover (87% opacity)
          },
        },
        algorithm: antdTheme.defaultAlgorithm,
      }}
    >
      <DevtoolsProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerBindings}
          notificationProvider={useNotificationProvider}
          resources={[
          // GROUP A: Core Content (Protected/Standard)
          {
            name: "articles",
            list: "/articles",
            create: "/articles/create",
            edit: "/articles/edit/:id",
            meta: { label: "Articles & Blogs" }
          },
          {
            name: "whitepapers",
            list: "/whitepapers",
            create: "/whitepapers/create",
            edit: "/whitepapers/edit/:id",
            meta: { label: "Whitepapers" }
          },
          {
            name: "case_studies",
            list: "/case_studies",
            create: "/case_studies/create",
            edit: "/case_studies/edit/:id",
            meta: { label: "Case Studies" }
          },
          {
            name: "videos",
            list: "/videos",
            create: "/videos/create",
            edit: "/videos/edit/:id",
            meta: { label: "Videos" }
          },
          {
            name: "client_logos",
            list: "/client_logos",
            create: "/client_logos/create",
            edit: "/client_logos/edit/:id",
            meta: { label: "Clients / Logos" }
          },
          {
            name: "book",
            list: "/book",
            create: "/book/create",
            edit: "/book/edit/:id",
            meta: { label: "Book: Age of Kretru" }
          },
          {
            name: "assessments",
            list: "/assessments",
            create: "/assessments/create",
            edit: "/assessments/edit/:id",
            meta: { label: "Assessments" }
          },

          // GROUP B: Entity Tables (Refactored)
          {
            name: "services", 
            list: "/services",
            create: "/services/create",
            edit: "/services/edit/:slug",
            meta: { label: "Services" }
          },
          {
            name: "industries", 
            list: "/industries",
            create: "/industries/create",
            edit: "/industries/edit/:id",
            meta: { label: "Industries" }
          },
          {
            name: "frameworks", 
            list: "/frameworks",
            create: "/frameworks/create",
            edit: "/frameworks/edit/:id",
            meta: { label: "Frameworks" }
          },
          {
            name: "outcomes",
            list: "/outcomes",
            create: "/outcomes/create",
            edit: "/outcomes/edit/:id",
            meta: { label: "Measurable Outcomes" }
          },

          // GROUP C: Pages & Config (New 15-Table Architecture)
          {
            name: "page_home",
            list: "/page_home",
            edit: "/page_home/edit/:id",
            meta: { label: "Home Page" }
          },
          {
            name: "page_about",
            list: "/page_about",
            edit: "/page_about/edit/:id",
            meta: { label: "About Page" }
          },
          {
            name: "page_contact",
            list: "/page_contact",
            edit: "/page_contact/edit/:id",
            meta: { label: "Contact Page" }
          },
          {
            name: "config_navbar",
            list: "/config_navbar",
            edit: "/config_navbar/edit/:id",
            meta: { label: "Navbar Config" }
          },
          {
            name: "config_footer",
            list: "/config_footer",
            edit: "/config_footer/edit/:id",
            meta: { label: "Footer Config" }
          }
        ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "3l839q-Az01rW-Pdt2jC",
            reactQuery: {
                clientConfig: {
                    defaultOptions: {
                        queries: {
                            staleTime: 0, 
                            retry: false,
                        },
                    },
                },
            },
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
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                        <img 
                          src="/kretrutosh-logo.png" 
                          alt="Kretrutosh Consulting" 
                          style={{ height: '48px', maxWidth: '200px', objectFit: 'contain' }}
                        />
                      </div>
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
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        padding: collapsed ? '8px' : '12px 16px',
                        transition: 'all 0.2s'
                      }}>
                        <img 
                          src="/kretrutosh-logo.png" 
                          alt="Kretrutosh" 
                          style={{ 
                            height: collapsed ? '32px' : '40px',
                            maxWidth: collapsed ? '32px' : '160px',
                            objectFit: 'contain',
                            transition: 'all 0.2s',
                            filter: 'brightness(0) invert(1)' // Make logo white for Navy background
                          }}
                        />
                      </div>
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
                element={<NavigateToResource resource="page_home" />}
              />


              <Route path="/website-content">
                <Route index element={<WebsiteContentList />} />
                <Route path="create" element={<WebsiteContentCreate />} />
                <Route path="edit/:id" element={<WebsiteContentEdit />} />
              </Route>
              
              <Route path="/pages">
                  <Route index element={<PagesList />} />
                  <Route path="edit/:id" element={<PagesEdit />} />
              </Route>

              <Route path="/videos">
                  <Route index element={<VideoList />} />
                  <Route path="create" element={<VideoCreate />} />
                  <Route path="edit/:id" element={<VideoEdit />} />
              </Route>

              <Route path="/articles">
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

              {/* NEW ROUTES */}
              <Route path="/services">
                  <Route index element={<ServiceList />} />
                  <Route path="create" element={<ServiceCreate />} />
                  <Route path="edit/:slug" element={<ServiceEdit />} />
              </Route>

              <Route path="/config_navbar">
                  <Route index element={<ConfigNavbarList />} />
                  <Route path="edit/:id" element={<ConfigNavbarEdit />} />
              </Route>

              <Route path="/config_footer">
                  <Route index element={<ConfigFooterList />} />
                  <Route path="edit/:id" element={<ConfigFooterEdit />} />
              </Route>

               <Route path="/page_home">
                  <Route index element={<PageHomeList />} />
                  <Route path="edit/:id" element={<PageHomeEdit />} />
              </Route>

              <Route path="/page_about">
                  <Route index element={<PageAboutList />} />
                  <Route path="edit/:id" element={<PageAboutEdit />} />
              </Route>

              <Route path="/page_contact">
                  <Route index element={<PageContactList />} />
                  <Route path="edit/:id" element={<PageContactEdit />} />
              </Route>

              <Route path="/book">
                  <Route index element={<BookList />} />
                  <Route path="create" element={<BookCreate />} />
                  <Route path="edit/:id" element={<BookEdit />} />
              </Route>

              <Route path="/outcomes">
                  <Route index element={<OutcomeList />} />
                  <Route path="create" element={<OutcomeCreate />} />
                  <Route path="edit/:id" element={<OutcomeEdit />} />
              </Route>


              <Route path="/ui_components">
                  <Route index element={<UIComponentsList />} />
                  <Route path="create" element={<UIComponentsCreate />} />
                  <Route path="edit/:id" element={<UIComponentsEdit />} />
              </Route>



              <Route path="*" element={<CatchAllNavigate to="/page_home" />} />
            </Route>
          </Routes>

          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    </ConfigProvider>
  );
}

export default App;