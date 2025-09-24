import { AppProvider, Page, Card, Text } from "@shopify/polaris";

export default function Home() {
  return (
    <AppProvider i18n={{}}>
      <Page title="Solos Customizer (MVP)">
        <Card sectioned>
          <Text as="p">
            Succes! De app is geïnstalleerd. Voeg nu het App Block toe op je productpagina om de Customizer te tonen.
          </Text>
        </Card>
      </Page>
    </AppProvider>
  );
}