import React, { Component } from 'react';
import './App.scss';
import Learner from '../components/Learner';

// TODO GTB-1: * 页面基本没有样式，只有添加按钮和标题
// TODO GTB-1: * 后端无法启动且api设计不符合要求，所有相关请求都失败，需求基本上没有实现
// TODO GTB-2: * 没有测试
// TODO GTB-3: * 有意识划分组件，但没有做组件划分
// TODO GTB-3: * 没有使用语义化标签
// TODO GTB-3: * 使用了Flex布局，scss及其基本特性
// TODO GTB-3: * 运用了部分ES6+语法及fetch
// TODO GTB-3: * 运用React知识点，但完成度较低，很多知识点无法验证
// TODO GTB-4: * 没有进行小步提交
// TODO GTB-4: * 没有抽出Api请求层
// TODO GTB-4: * 组件的拆分和复用需要加强
// TODO GTB-4: * state与变量命名需要注意
// TODO GTB-4: * 存在一个lint error，需要fix
class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO GTB-4: - stat命名同变量，需要小写开头
      LearnerList: [],
      // TODO GTB-4: - 命名不要使用动名形式，可以写isAdding
      addLearner: false,
    };
  }

  componentDidMount() {
    this.refreshLearnerList();
  }

  refreshLearnerList = () => {
    this.fetchLearnerList().then((learnerList) => {
      // TODO GTB-4: - learnerList注意大小写与state匹配
      this.setState({ learnerList });
    });
  };

  // TODO GTB-4: - api请求相关可以抽出请求层
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
      // TODO GTB-3: - 注意加强语义化标签的使用
      <div data-testid="app" className="App">
        学员列表
        {/* TODO GTB-3: - 整体实现较少，继续实现需要进行组件的拆分与复用 */}
        {/* TODO GTB-4: - 标签的class命名我们采用a-b-c形式 */}
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
