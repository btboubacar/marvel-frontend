import React, { Component } from "react";
import Switch from "react-switch";

class SliderSwitch extends Component {
  constructor(props) {
    super(props);
    // this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked, event) {
    // this.setState({ checked });
    this.props.setMode(!this.props.mode);
  }

  render() {
    return (
      <label>
        {/* <span>Switch with default style</span> */}
        <Switch
          onChange={this.handleChange}
          checked={this.props.mode}
          offColor="#2CB1BA"
          // onColor="#2CB1BA"
          handleDiameter={20}
          width={60}
          height={25}
          uncheckedIcon={<div></div>}
          uncheckedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 20,
                color: "red",
              }}
            >
              ☀{/* ↑ */}
            </div>
          }
          checkedIcon={<div></div>}
          checkedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "black",
                fontSize: 18,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            >
              ☽{/* ↓ */}
            </div>
          }
        />
      </label>
    );
  }
}

export default SliderSwitch;
