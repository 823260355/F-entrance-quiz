import React, { Component } from 'react';
import './App.scss';
import Learner from '../components/Learner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      LearnerList: [],
      addLearner: false,
    };
  }

  componentDidMount() {
    this.refreshLearnerList();
  }

  refreshLearnerList = () => {
    this.fetchLearnerList().then((learnerList) => {
      this.setState({ learnerList });
    });
  };

  fetchLearnerList = () => {
    return fetch('http://localhost:9698/learners').then((response) => {
      return response.json();
    });
  };

  fetchAddLearner = (data) => {
    return fetch('http://localhost:9698/learners', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then((response) => {
      return response.status === 201 ? Promise.resolve() : Promise.reject();
    });
  };

  handleAddLearnerEvent = () => {
    this.setState({ addLearner: true });
  };

  handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.setState({ addLearner: false });
      this.fetchAddLearner({ name: event.target.value }).then(() => {
        this.refreshLearnerList();
      });
    }
  };

  render() {
    return (
      <div data-testid="app" className="App">
           学员列表
        <div className="learner_list">
        {this.state.LearnerList.map((learner) => (
            <Learner key={learner.id} id={learner.id} name={learner.learnerName} />
          ))}
          {this.state.addLearner ? (
            // eslint-disable-next-line jsx-a11y/no-autofocus
            <input autoFocus onKeyDown={this.handleInputKeyDown} />
          ) : (
            <button id="add_learner_btn" type="button" onClick={this.handleAddLearnerEvent}>
              +添加学员
            </button>
          )}
        </div> 
      </div>
        
    );
  }
}

export default App;
