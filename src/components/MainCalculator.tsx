import React from "react";
import { Component } from "react";
import { Grid, Form, Header, Text, Button } from "tabler-react";
import { Person, DescriptionAndAmount } from "./Person";

interface State {
  people: Person[];
  shared: DescriptionAndAmount[];
}

export default class MainCalculator extends Component<{}, State> {
  state = {
    people: [
      {
        name: "Rolf",
        income: {
          afterTax: 50000,
          beforeTax: 1
        },
        personalResponsibilities: [
          { description: "Levies", amount: 5500.0 },
          { description: "Rent", amount: 0 },
          { description: "Internet", amount: 810 },
          { description: "Netflix", amount: 200.0 },
          { description: "Property tax", amount: 1500.0 }
        ]
      },
      {
        name: "Nadine",
        income: {
          afterTax: 11200,
          beforeTax: 0
        },
        personalResponsibilities: []
      }
    ],
    shared: [
      { description: "Groceries", amount: 7700 },
      { description: "Entertainment", amount: 3000 },
      { description: "Pets", amount: 300 },
      { description: "Health and fitness", amount: 1500 }
    ]
  };

  renderNameInput(index: number) {
    let person = this.state.people[index];
    return (
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Input
          value={person.name}
          placeholder="Username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            person.name = e.target.value;
            this.setState({
              people: this.state.people
            });
          }}
        />
      </Form.Group>
    );
  }

  renderIncome(person: Person) {
    return (
      <Form.Group>
        <Form.Label>Income after tax</Form.Label>
        <Form.Input
          value={person.income.afterTax}
          placeholder="10000"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            person.income.afterTax = parseInt(e.target.value) || 0;
            this.setState({
              people: this.state.people
            });
          }}
        />
      </Form.Group>
    );
  }

  renderSummary() {
    let personOne = this.state.people[0];
    let personTwo = this.state.people[1];
    let totalIncome = personOne.income.afterTax + personTwo.income.afterTax;
    let personOneIncomePercent = personOne.income.afterTax / totalIncome;
    let personTwoIncomePercent = personTwo.income.afterTax / totalIncome;

    let personOneTotalExistingPayments = this.sumDescAmounts(
      personOne.personalResponsibilities
    );
    let personTwoTotalExistingPayments = this.sumDescAmounts(
      personTwo.personalResponsibilities
    );

    let totalSharedBudget =
      this.sumDescAmounts(this.state.shared) +
      personOneTotalExistingPayments +
      personTwoTotalExistingPayments;

    const personOneContribution =
      totalSharedBudget * personOneIncomePercent -
      personOneTotalExistingPayments;
    const personTwoContribution =
      totalSharedBudget * personTwoIncomePercent -
      personTwoTotalExistingPayments;
    return (
      <p>
        <Grid.Row>
          <Grid.Col>
            {this.marker(personOne.name)} you are contributing{" "}
            {this.marker(this.percent(personOneIncomePercent))} and{" "}
            {this.marker(personTwo.name)} is contributing{" "}
            {this.marker(this.percent(personTwoIncomePercent))} of your total
            shared income of {this.marker(this.amount(totalIncome))}
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>Total income</Grid.Col>
          <Grid.Col>{this.amount(totalIncome)}</Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>Total shared budget per month</Grid.Col>
          <Grid.Col>
            {this.amount(totalSharedBudget)} (
            {this.percent(totalSharedBudget / totalIncome)} of your shared
            income)
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col>{personOne.name} your contribution base on income</Grid.Col>
          <Grid.Col>{this.amount(personOneContribution)}</Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col>{personTwo.name} your contribution base on income</Grid.Col>
          <Grid.Col>{this.amount(personTwoContribution)}</Grid.Col>
        </Grid.Row>
      </p>
    );
  }

  sumDescAmounts(list: DescriptionAndAmount[]) {
    return list.reduce((a, b) => a + (b.amount || 0), 0);
  }

  percent(amount: number) {
    return Math.round(amount * 100) + "%";
  }

  amount(amount: number) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  marker(string: any) {
    return <span style={{ fontWeight: "bolder" }}>{string}</span>;
  }

  renderSharedExpenses(shared: DescriptionAndAmount[]) {
    let values = [...shared, { description: "", amount: 0 }];
    return (
      <Form.Group>
        {values.map((responsible, i) => (
          <Grid.Row key={i}>
            <Grid.Col>
              <Form.Input
                value={responsible.description}
                placeholder="eg. Levies, Rent, Groceries, Internet"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let isAdd =
                    responsible.description === "" && responsible.amount === 0;
                  responsible.description = e.target.value;
                  if (isAdd) shared.push(responsible);
                  this.setState({
                    people: this.state.people
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col>
              {responsible.description === "" && responsible.amount === 0 ? (
                <div></div>
              ) : (
                <Form.Input
                  type="number"
                  value={responsible.amount}
                  placeholder="Amount"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    responsible.amount = parseInt(e.target.value) || 0;
                    this.setState({
                      people: this.state.people
                    });
                  }}
                />
              )}
            </Grid.Col>
          </Grid.Row>
        ))}
      </Form.Group>
    );
  }

  render() {
    return (
      <div>
        <Grid.Row className={"mt-3"}>
          <Grid.Col>
            <Header.H2>Give us some info:</Header.H2>
          </Grid.Col>
        </Grid.Row>
        <Form.FieldSet>
          <Grid.Row>
            <Grid.Col>{this.renderNameInput(0)}</Grid.Col>
            <Grid.Col>{this.renderNameInput(1)}</Grid.Col>
          </Grid.Row>
        </Form.FieldSet>
        <Grid.Row className={"mt-3"}>
          <Grid.Col>
            <Header.H2>Lets talk income:</Header.H2>
          </Grid.Col>
        </Grid.Row>
        <Form.FieldSet>
          <Grid.Row>
            <Grid.Col>
              <Header.H2>{this.state.people[0].name}</Header.H2>
              {this.renderIncome(this.state.people[0])}
            </Grid.Col>
            <Grid.Col>
              <Header.H2>{this.state.people[1].name}</Header.H2>
              {this.renderIncome(this.state.people[1])}
            </Grid.Col>
          </Grid.Row>
        </Form.FieldSet>

        <Grid.Row className={"mt-3"}>
          <Grid.Col>
            <Header.H2>
              Do you pay for something out of personal accounts:
            </Header.H2>
          </Grid.Col>
        </Grid.Row>
        <Form.FieldSet>
          <Grid.Row>
            <Grid.Col>
              <Header.H2>{this.state.people[0].name}</Header.H2>
              {this.renderSharedExpenses(
                this.state.people[0].personalResponsibilities
              )}
            </Grid.Col>
            <Grid.Col>
              <Header.H2>{this.state.people[1].name}</Header.H2>
              {this.renderSharedExpenses(
                this.state.people[1].personalResponsibilities
              )}
            </Grid.Col>
          </Grid.Row>
        </Form.FieldSet>
        <Grid.Row className={"mt-3"}>
          <Grid.Col>
            <Header.H2>Budget for your shared account:</Header.H2>
            “When you’re sharing responsibility for finances, a compromise could
            be the best way to go. You can open a joint account to take care of
            the bills, but keep your own accounts to pay for the things you
            individually want. It’s a great way to make budgeting easier and
            keep some independence and privacy. Here are a few things to think
            about when you’re deciding how to share the responsibility: Decide
            which bills to pay from the joint account. Settle on a contribution
            to pay into the joint account each month, whether it’s 50/50 or
            related to the size of your income.”
            <Text muted>
              The Money Advice Service (GB):Should you manage your money jointly
              or separately? &nbsp;
              <br />
              Date accessed: 10/11/2019 <br />
              <a href="https://www.moneyadviceservice.org.uk/en/articles/should-we-manage-money-jointly-or-separately">
                Link
              </a>
              <br />
            </Text>
          </Grid.Col>
        </Grid.Row>
        <Form.FieldSet>
          <Grid.Row>
            <Grid.Col>{this.renderSharedExpenses(this.state.shared)}</Grid.Col>
          </Grid.Row>
        </Form.FieldSet>
        <Grid.Row>
          <Grid.Col className={"pull-right"}>
            <Header.H1>Summary</Header.H1>
            {this.renderSummary()}
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col className={"pull-right"}>
            <Button icon="check" color="success">
              Calculate
            </Button>
          </Grid.Col>
        </Grid.Row>
      </div>
    );
  }
}
