import React from "react";
import { Component } from "react";
import { Form } from "tabler-react";
import { Person } from "./Person";

interface State {}

interface Prop {
  person: Person;
}

export class PersonView extends Component<Prop, State> {
  render() {
    var person = this.props.person;
    return (
      <div>
        <Form.FieldSet>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Input value={person.name} placeholder="Username" />
          </Form.Group>
        </Form.FieldSet>
        <h2>H</h2>
      </div>
    );
  }
}
