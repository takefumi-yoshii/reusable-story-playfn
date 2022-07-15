import type {
  ComponentStoryObj,
  ReactFramework,
  StoryContext,
} from "@storybook/react";
import { fireEvent, within } from "@storybook/testing-library";
import { rest } from "msw";
import { Form } from "./Form";
// ____________________________________________________________
//
type Story = ComponentStoryObj<typeof Form>;
export default { component: Form };
// ____________________________________________________________
//
const fillTextbox = (
  ui: ReturnType<typeof within>,
  { name, value }: { name: string; value: string }
) => {
  const textbox = ui.getByLabelText(name);
  fireEvent.change(textbox, { target: { value } });
};

export const FillAll: Story = {
  name: "全て入力した時",
  play: async ({ canvasElement }) => {
    const ui = within(canvasElement);
    [
      { name: "氏名", value: "山田太郎" },
      { name: "年齢", value: "27" },
      { name: "メール", value: "test@example.com" },
      { name: "電話番号", value: "080-000-0000" },
    ].forEach((values) => fillTextbox(ui, values));
  },
};
// ____________________________________________________________
//
type Context = StoryContext<ReactFramework, unknown>;
const fillAndSubmit =
  (inlinePlay?: (ctx: Context) => Promise<void>) => async (ctx: Context) => {
    await FillAll.play?.(ctx);
    await inlinePlay?.(ctx);
    const ui = within(ctx.canvasElement);
    fireEvent.click(ui.getByRole("button", { name: /submit/i }));
  };
// ____________________________________________________________
//
export const NameError: Story = {
  name: "名前未入力時",
  play: fillAndSubmit(async ({ canvasElement }) => {
    const ui = within(canvasElement);
    fillTextbox(ui, { name: "氏名", value: "" });
  }),
};
export const AgeError1: Story = {
  name: "年齢が数値でない時",
  play: fillAndSubmit(async ({ canvasElement }) => {
    const ui = within(canvasElement);
    fillTextbox(ui, { name: "年齢", value: "あいう" });
  }),
};
export const AgeError2: Story = {
  name: "年齢が整数でない時",
  play: fillAndSubmit(async ({ canvasElement }) => {
    const ui = within(canvasElement);
    fillTextbox(ui, { name: "年齢", value: "27.8" });
  }),
};
export const AgeError3: Story = {
  name: "年齢が自然数でない時",
  play: fillAndSubmit(async ({ canvasElement }) => {
    const ui = within(canvasElement);
    fillTextbox(ui, { name: "年齢", value: "-18" });
  }),
};
export const MailError: Story = {
  name: "メールが不正なフォーマットの時",
  play: fillAndSubmit(async ({ canvasElement }) => {
    const ui = within(canvasElement);
    fillTextbox(ui, { name: "メール", value: "あいう" });
  }),
};
export const PhoneError: Story = {
  name: "電話番号が不正なフォーマットの時",
  play: fillAndSubmit(async ({ canvasElement }) => {
    const ui = within(canvasElement);
    fillTextbox(ui, { name: "電話番号", value: "あいう" });
  }),
};
export const SucceedSubmit: Story = {
  name: "送信が成功した時",
  play: fillAndSubmit(),
  parameters: {
    msw: {
      handlers: [
        rest.post("http://api.example.com", (req, res, ctx) =>
          res(ctx.status(201), ctx.json(req.body))
        ),
      ],
    },
  },
};
export const FailedSubmit: Story = {
  name: "送信が失敗した時",
  play: fillAndSubmit(),
  parameters: {
    msw: {
      handlers: [
        rest.post("http://api.example.com", (_, res, ctx) =>
          res(ctx.status(400), ctx.json({ errors: ["不正なリクエストです"] }))
        ),
      ],
    },
  },
};
