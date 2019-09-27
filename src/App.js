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
        const data = res.data
        // console.log(data)
        const baseUrl = data.baseUrl
        const fileName = data.fileName
        this.setState({ baseUrl, fileName })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button>
        <div>
          <p>{`${this.state.baseUrl}/${this.state.fileName}`}</p>
        </div>
      </div>
    )
  }
}

export default App
