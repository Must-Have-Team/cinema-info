import React, { Component } from "react";
import "./Login.css";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: ""
//     };
//   }

//   validateForm() {
//     return this.state.email.length > 0 && this.state.password.length > 0;
//   }

//   handleChange = event => {
//     this.setState({
//       [event.target.id]: event.target.value
//     });
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div className="Login">
//         <form onSubmit={this.handleSubmit}>
//         <h2 className='txtStyle'>Sign up</h2>
//           <FormGroup controlId="email" bsSize="large">
//             <ControlLabel>Email</ControlLabel>
//             <FormControl
//               autoFocus
//               type="email"
//               value={this.state.email}
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup controlId="password" bsSize="large">
//             <ControlLabel>Password</ControlLabel>
//             <FormControl
//               value={this.state.password}
//               onChange={this.handleChange}
//               type="password"
//             />
//           </FormGroup>
//           <Button
//             block
//             bsSize="large"
//             disabled={!this.validateForm()}
//             type="submit"
//           >
//             Login
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }
class Login extends Component {
    render () {
      return (
      <div className="login-wrap">
        <div className="login-html">
          <button id="close">
            <i className="fa fa-times" aria-hidden="true" />
          </button>
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /> <label htmlFor="tab-1" className="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" /> <label htmlFor="tab-2" className="tab">Sign Up</label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input" />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" data-type="password" />
              </div>
              <div className="group">
                <input id="check" type="checkbox" className="check" defaultChecked />
                <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign In" />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input" />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" data-type="password" />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Repeat Password</label>
                <input id="pass" type="password" className="input" data-type="password" />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Email Address</label>
                <input id="pass" type="text" className="input" />
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign Up" />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
  }
}

export default Login;