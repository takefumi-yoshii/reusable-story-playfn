import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { setupMockServer } from "../../utils/jest";
import * as stories from "./Form.stories";
// ____________________________________________________________
//
const {
  NameError,
  AgeError1,
  AgeError2,
  AgeError3,
  MailError,
  PhoneError,
  FailedSubmit,
} = composeStories(stories);
// ____________________________________________________________
//
const server = setupMockServer();

describe("components/From", () => {
  describe("frontend validation", () => {
    test("NameError", async () => {
      const { container, findByRole } = render(<NameError />);
      await NameError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent("入力してください");
    });
    test("AgeError1", async () => {
      const { container, findByRole } = render(<AgeError1 />);
      await AgeError1.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "数値を入力してください"
      );
    });
    test("AgeError2", async () => {
      const { container, findByRole } = render(<AgeError2 />);
      await AgeError2.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "整数を入力してください"
      );
    });
    test("AgeError3", async () => {
      const { container, findByRole } = render(<AgeError3 />);
      await AgeError3.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "正の数を入力して下さい"
      );
    });
    test("MailError", async () => {
      const { container, findByRole } = render(<MailError />);
      await MailError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent("不正な形式です");
    });
    test("PhoneError", async () => {
      const { container, findByRole } = render(<PhoneError />);
      await PhoneError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent("不正な形式です");
    });
  });
  describe("serverside validation", () => {
    test("FailedSubmit", async () => {
      server.use(...FailedSubmit.parameters?.msw.handlers);
      const { container, findByRole } = render(<FailedSubmit />);
      await FailedSubmit.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "不正なリクエストです"
      );
    });
  });
});
