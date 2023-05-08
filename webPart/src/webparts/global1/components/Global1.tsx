import * as React from "react";
import { IGlobal1Props } from "./IGlobal1Props";
import AllRoutes from "./Routes/AllRoutes";
import { HashRouter } from "react-router-dom";
import AppContextProvider from "./Context/AppContext";
import { Layout } from "./Routes/Layout";

export default class Global1 extends React.Component<IGlobal1Props, {}> {
  public render(): React.ReactElement<IGlobal1Props> {
    const {} = this.props;

    return (
      <>
        <Layout>
          <HashRouter>
            <AppContextProvider>
              <AllRoutes />
            </AppContextProvider>
          </HashRouter>
        </Layout>
      </>
    );
  }
}
