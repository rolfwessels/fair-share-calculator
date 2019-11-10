import React from "react";
import { Component } from "react";
import { Grid } from "index";
import { PersonView } from "./PersonView";
import { Person } from "./Person";

interface State {
  people: Person[];
}

export default class MainCalculator extends Component<{}, State> {
  state = {
    people: [{ name: "Rolf" }, { name: "Nadine" }]
  };

  render() {
    return (
      <Grid.Row>
        <Grid.Col>
          <PersonView person={this.state.people[0]}></PersonView>
        </Grid.Col>
        <Grid.Col>
          <PersonView person={this.state.people[0]}></PersonView>
        </Grid.Col>
      </Grid.Row>
    );
  }
}
