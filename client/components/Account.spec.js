/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Account } from "./Account";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("Account", () => {
  let account;

  beforeEach(() => {
    Account = shallow(<Account email="cody@email.com" />);
  });

  it("renders the email in an h3", () => {
    expect(account.find("h3").text()).to.be.equal("Welcome, cody@email.com");
  });
});
