export function buildPerson(givenName: string): Person {
  return {
    name: givenName,
    income: {
      afterTax: 0,
      beforeTax: 0
    },
    personalResponsibilities: []
  };
}

export interface Person {
  name: string;
  income: {
    beforeTax: number;
    afterTax: number;
  };
  personalResponsibilities: DescriptionAndAmount[];
}

export interface DescriptionAndAmount {
  description: string;
  amount: number;
}
