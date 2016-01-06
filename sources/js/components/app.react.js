// Library
import React from 'react'

//　PageComponent
import Board from '../components/board.react'

class App extends React.Component {

  _handleExit(e) {

    window.close();
  }

  render() {

    var title = "Tasksk"

    return (
      <div>
        <nav className="teal lighten-2" style={{"WebkitAppRegion": "drag"}}>
          <div className="nav-wrapper">
            <ul className="left">
              <h4>　{title}　</h4>
            </ul>
            <ul className="right">
              <li>
                <a onClick={this._handleExit.bind(this)} style={{"WebkitAppRegion": "no-drag"}}>
                  <i className="large material-icons">power_settings_new</i>
                </a>
              </li>
            </ul>
          </div>
         </nav>

        <br/>
        <div className="row">
          <div className="col s12">
            <Board/>
          </div>
        </div>
      </div>
    )
  }

}

export default App