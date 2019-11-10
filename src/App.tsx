import React from "react";
import { Card, Button, Page, Grid, Form } from "tabler-react";
import "tabler-react/dist/Tabler.css";
import MainCalculator from "./components/MainCalculator";

const App: React.FC = () => {
  return (
    <Page>
      <Page.Header></Page.Header>
      <Page.Content>
        <Card>
          <Card.Header>
            <Card.Title>Fair share calculator</Card.Title>
          </Card.Header>
          <Card.Body>
            <MainCalculator></MainCalculator>
          </Card.Body>
        </Card>
      </Page.Content>
    </Page>
  );
};

export default App;
