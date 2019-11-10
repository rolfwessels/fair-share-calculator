import React from "react";
import { Component } from "react";
import { Grid, Form, Header } from "tabler-react";
import { PersonView } from "./PersonView";
import { Person, buildPerson } from "./Person";

interface State {
  people: Person[];
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

  renderExpenses(person: Person) {
    var values = [
      ...person.personalResponsibilities,
      { description: "", amount: "" }
    ];
    return (
      <Form.Group>
        {values.map((responsible, i) => (
          <Grid.Row key={i}>
            <Grid.Col>
              <Form.Input
                value={responsible.description}
                placeholder="Description"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  responsible.description = e.target.value;
                  this.setState({
                    people: this.state.people
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col>
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
            <Grid.Col>{this.renderIncome(this.state.people[0])}</Grid.Col>
            <Grid.Col>{this.renderIncome(this.state.people[1])}</Grid.Col>
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
            <Grid.Col>{this.renderExpenses(this.state.people[0])}</Grid.Col>
            <Grid.Col>{this.renderExpenses(this.state.people[1])}</Grid.Col>
          </Grid.Row>
        </Form.FieldSet>
      </div>
    );
  }
}

{
}
