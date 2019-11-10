import React from "react";
import { Component } from "react";
import { Grid } from "index";
import { Person } from "./Person";

interface State {}

interface Prop {
  person: Person;
}

export class PersonView extends Component<Prop, State> {
  state = {
    people: [{ name: "Rolf" }, { name: "Nadine" }]
  };

  render() {
    return <div>ja</div>;
  }
}
