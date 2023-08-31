import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act, fireEvent } from "@testing-library/react";

import Login from "./Login";

describe("Login component tests", () => {
  let container: HTMLElement;

  function setup() {
    container = render(
      <Provider store={store}>
        <ToastContainer />
        <Router>
          <Login />
        </Router>
      </Provider>
    ).container;
  }

  beforeEach(() => {
    setup();
  });

  it("should render correctly the login component", () => {
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();

    const inputs = screen.getAllByTestId("input");
    expect(inputs).toHaveLength(2);
    expect(inputs[0].getAttribute("value")).toBe("");
  });

  it("click login button with incomplete credentials  - show required message", async () => {
    const submitBtn = screen.getByTestId("btn-submit");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(submitBtn);
    });

    expect(
      await screen.findByText("Please fill all input fields")
    ).toBeInTheDocument();
  });

  it("click login with right credentials - successful login", async () => {
    const inputs = screen.getAllByTestId("input");
    const email = inputs[0];
    const password = inputs[1];
    const submitBtn = screen.getByTestId("btn-submit");

    fireEvent.change(email, { target: { value: "white@abv.bg" } });
    fireEvent.change(password, { target: { value: "1234567" } });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("User login successful!")
    ).toBeInTheDocument();
  });

  it("click login with wrong email - unsuccessful login", async () => {
    const inputs = screen.getAllByTestId("input");
    const email = inputs[0];
    const password = inputs[1];
    const submitBtn = screen.getByTestId("btn-submit");

    fireEvent.change(email, { target: { value: "someStrangeEmail@abv.bg" } });
    fireEvent.change(password, { target: { value: "1234567" } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText("Invalid user")).toBeInTheDocument();
  });

  it("click login with wrong password - unsuccessful login", async () => {
    const inputs = screen.getAllByTestId("input");
    const email = inputs[0];
    const password = inputs[1];
    const submitBtn = screen.getByTestId("btn-submit");

    fireEvent.change(email, { target: { value: "white@abv.bg" } });
    fireEvent.change(password, { target: { value: "asdasd" } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    // expect(toast.error).toBeCalled();
  });
});

// jest.mock("../../features/auth/auth-api.ts", () => ({
//   __esModule: true,
//   default: () => () => {
//     data: "whatever you want";
//   },
// }));

// jest.mock("../../components/Login/Login.tsx", () => () => (<div id="mockComponent">Hello Mock</div>));

// import { Provider } from "react-redux";
// import { store } from "../../app/store";
// import { BrowserRouter as Router } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// import { render, screen } from "@testing-library/react";
// import user from "@testing-library/user-event";
// import { act, fireEvent } from "@testing-library/react";

// import Login from "./Login";

// describe("Login component tests", () => {
//   let container: HTMLElement;

//   function setup() {
//     container = render(
//       <Provider store={store}>
//         <ToastContainer />
//         <Router>
//           <Login />
//         </Router>
//       </Provider>
//     ).container;
//   }

//   beforeEach(() => {
//     setup();
//   });

//   it("should render correctly the login component", () => {
//     const mainElement = screen.getByRole("main");
//     expect(mainElement).toBeInTheDocument();

//     const inputs = screen.getAllByTestId("input");
//     expect(inputs).toHaveLength(2);
//     expect(inputs[0].getAttribute("value")).toBe("");
//   });

//   it("click login button with incomplete credentials  - show required message", async () => {
//     const submitBtn = screen.getByTestId("btn-submit");
//     // eslint-disable-next-line testing-library/no-unnecessary-act
//     act(() => {
//       user.click(submitBtn);
//     });

//     expect(
//       await screen.findByText("Please fill all input fields")
//     ).toBeInTheDocument();
//   });

//   it("click login with right credentials - successful login", async () => {
//     const inputs = screen.getAllByTestId("input");
//     const email = inputs[0];
//     const password = inputs[1];
//     const submitBtn = screen.getByTestId("btn-submit");

//     fireEvent.change(email, { target: { value: "white@abv.bg" } });
//     fireEvent.change(password, { target: { value: "1234567" } });
//     fireEvent.click(submitBtn);

//     expect(
//       await screen.findByText("User login successful!")
//     ).toBeInTheDocument();
//   });

//   it("click login with wrong email - unsuccessful login", async () => {
//     const inputs = screen.getAllByTestId("input");
//     const email = inputs[0];
//     const password = inputs[1];
//     const submitBtn = screen.getByTestId("btn-submit");

//     fireEvent.change(email, { target: { value: "someStrangeEmail@abv.bg" } });
//     fireEvent.change(password, { target: { value: "1234567" } });
//     fireEvent.click(submitBtn);

//     expect(await screen.findByText("Invalid user")).toBeInTheDocument();
//   });

//   it("click login with wrong password - unsuccessful login", async () => {
//     const inputs = screen.getAllByTestId("input");
//     const email = inputs[0];
//     const password = inputs[1];
//     const submitBtn = screen.getByTestId("btn-submit");

//     fireEvent.change(email, { target: { value: "white@abv.bg" } });
//     fireEvent.change(password, { target: { value: "asdasd" } });
//     fireEvent.click(submitBtn);

//     expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
//     // expect(toast.error).toBeCalled();
//   });
// });

// // jest.mock("../../features/auth/auth-api.ts", () => ({
// //   __esModule: true,
// //   default: () => () => {
// //     data: "whatever you want";
// //   },
// // }));

// // jest.mock("../../components/Login/Login.tsx", () => () => (<div id="mockComponent">Hello Mock</div>));
