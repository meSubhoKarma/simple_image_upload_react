import React from "react"
import axios from "axios"

class App extends React.Component {
  state = {
    selectedFile: null,
  }

  fileSelectedHandler = e => {
    // console.log(e)
    // console.log(e.target.files[0])
    this.setState({
      selectedFile: e.target.files[0],
    })
  }

  fileUploadHandler = () => {
    const formData = new FormData()
    formData.append(
      // name the "file" wrt to the server acceptance
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios
      .post(`http://162.241.29.113:8082/uploadfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <input
          style={{
            display: "none",
          }}
          type="file"
          onChange={this.fileSelectedHandler}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <button onClick={() => this.fileInput.click()}>Pick File</button>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    )
  }
}

export default App
