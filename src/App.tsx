import PageRouter from "./routes/PageRouter.tsx";
import NavMenu from "./components/ui/NavMenu.tsx";
import {ApolloProvider} from "@apollo/client";
import Header from "./components/ui/Header.tsx";
import client from "./api/apolloClient.ts";
// import Footer from "./components/Footer.tsx";

const App = () => (
    <ApolloProvider client={client}>
        <div className="bg-white h-screen">
            <Header/>
            <NavMenu/>
            <PageRouter/>
            {/*<Footer />*/}
        </div>
    </ApolloProvider>
);

export default App;
