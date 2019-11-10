import React from "react";
import { Card, Button, Page, Grid, Form, Header, Text } from "tabler-react";
import "tabler-react/dist/Tabler.css";
import MainCalculator from "./components/MainCalculator";

const App: React.FC = () => {
  return (
    <Page>
      <Page.Header></Page.Header>
      <Page.Content>
        <Card>
          <Card.Header>
            <Card.Title>Fair share calculator </Card.Title>
          </Card.Header>
          <Card.Body>
            <p>
              "Combining accounts can simplify your finances and may help breed
              trust in a marriage. Moreover, it may be especially valuable when
              one spouse chooses to take on more household or child-rearing
              duties than the other and as a result there is inequality in
              income. That said, some level of independence may be preferable to
              you both..."
            </p>
            <Text muted>
              Money Crashers: 18 Money management Tips for Newly Married Couples
              &nbsp;
              <br />
              Date accessed: 10/11/2019 <br />
              <a href="https://www.moneycrashers.com/money-management-newly-married-couples/">
                Link
              </a>
              <br />
            </Text>
            <MainCalculator></MainCalculator>
          </Card.Body>
        </Card>
      </Page.Content>
    </Page>
  );
};

export default App;
