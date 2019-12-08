import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
const questionsData = require('../models/questions.json');

export class UserInfoPage extends Component {
    constructor(props) {
        super(props);
        this.questionsData = questionsData;
        this.state = {
            onQuestionIndex: 0,
            data: {},
            done: false
        }
    }

    writeData = (index, newData) => {
        var { data } = this.state;
        data[index] = newData
        this.setState({
            data: data
        })
    }

    uploadData = () => {
        const { fillInfo } = this.props;
        const { data } = this.state
        fillInfo(data)
        this.setState({
            done: true
        })
    }

    nextQuestion = () => {
        this.setState({
            onQuestionIndex: this.state.onQuestionIndex + 1
        })
    }

    previousQuestion = () => {
        this.setState({
            onQuestionIndex: this.state.onQuestionIndex - 1
        })
    }

    renderQustion() {
        {
            console.log(this.questionsData);
            const { onQuestionIndex } = this.state;
            const question =  this.questionsData.questions[onQuestionIndex];
            console.log(onQuestionIndex);
            switch (question.type) {
                case 'mcs':
                    return <MultipleChoiceSingle question={question} index={onQuestionIndex} writeData={this.writeData}
                        nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} uploadData={this.uploadData}
                        numQuestions={Object.keys(this.questionsData.questions).length}/>
                case 'mcm':
                    return <MultipleChoiceMultiple question={question} index={onQuestionIndex} writeData={this.writeData}
                        nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} uploadData={this.uploadData}
                        numQuestions={Object.keys(this.questionsData.questions).length}/>
                case 'int':
                    return <IntInput question={question} index={onQuestionIndex} writeData={this.writeData}
                        nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} uploadData={this.uploadData}
                        numQuestions={Object.keys(this.questionsData.questions).length}/>
                case 'keywords':
                    return <KeywordsInput question={question} index={onQuestionIndex} writeData={this.writeData}
                        nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} uploadData={this.uploadData}
                        numQuestions={Object.keys(this.questionsData.questions).length}/>
                default:
                    return null
            }
        }
    }

    render() {
        const style = {
            width: '500px', height: '350px', display: 'inline-block',
            border: '2px solid rgb(50, 50, 50)', margin: '8px', padding: '20px'
        };
        if (this.state.done)
            return <Redirect to='/' />
        return (
            <div>
              <div id='header-instructions'>
                <h2>User Survey</h2>
                <h6>(the information you put in will not be seen by any other people)</h6>
              </div>
              <div id='question-container' 
                   style={style}>
                {this.renderQustion()}
              </div>
            </div>
        )
    }
}

class MultipleChoiceSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: -1,
            valid: false
        };
    }

    updateSelection = e => {
        const { value } = e.target;
        console.log(value);
        this.setState({
            choice: this.props.question.choices.findIndex((v) => v === value),
            valid: true
        });
    }

    render() {
        const { question, index, nextQuestion, previousQuestion, writeData, numQuestions } = this.props;
        const { valid } = this.state;
        const style = {
            margin: '25px',
            display: 'flex-box',
            position: 'relative'
        }
        console.log(`index ${index}`);
        return (
            <div>
                <h4>{question.prompt}</h4>
                {
                    (question.choices.length < 5) ? 
                    question.choices.map((value) => (
                        <label>
                            <input type='radio' name={`question-${index}`} 
                                onChange={this.updateSelection}
                                value={value} style={style} />
                            {value}
                        </label>
                    )) :
                    <select onChange={this.updateSelection}>
                        {question.choices.map((value) => (
                            <option value={value} style={style}>
                                {value}
                            </option>
                        ))}
                    </select>
                }


                <div style={{position: "fixed", top: '610px'}}>
                    <button className='btn btn-primary' 
                        style={{width: '100px', padding: '5px', display: (index===0)? 'none' : 'inherit'}}
                        onClick={(e => {
                            writeData(index, this.state.choice);
                            previousQuestion(); 
                            })}>Previous</button>
                </div>
                {(index !== numQuestions-1)?
                <div style={{position: "fixed", top: '610px', left: '620px'}}>
                    <button className='btn btn-primary' style={{width: '100px', padding: '5px'}}
                        disabled={!valid} 
                        onClick={(e => {
                            if (!valid)
                                return
                                writeData(index, this.state.choice);
                            nextQuestion();
                            })}>Next</button>
                </div> :
                <div style={{position: "fixed", top: '610px', left: '620px'}}>
                    <button className='btn btn-primary' style={{width: '100px', padding: '5px'}}
                        disabled={!valid} 
                        onClick={(e => {
                            if (!valid)
                                return
                            writeData(index, this.state.choice);
                            })}>Complete</button>
                </div>}
            </div>
        )
    }
}

class MultipleChoiceMultiple extends Component {

}

class IntInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            valid: false
        };
    }

    updateSelection = e => {
        const { value } = e.target;
        var { question } = this.props;
        console.log(value);
        if (question.range[0] < Number(value) < question.range[1]) // make sure data is in range
        {
            this.setState({
                data: Number(value),
                valid: true
            });
        }
    }

    render() {
        const { question, index, nextQuestion, previousQuestion, writeData, numQuestions } = this.props;
        const { valid } = this.state;
        const style = {
            margin: '25px',
            display: 'flex-box',
            position: 'relative'
        }
        console.log(`index ${index}`);
        return (
            <div>
                <h4>{question.prompt}</h4>
                <textarea
                    value={this.state.data}
                    onChange={this.updateSelection}
                    placeholder={question.placeholder}
                    />

                <div style={{position: "fixed", top: '610px'}}>
                    <button className='btn btn-primary' 
                        style={{width: '100px', padding: '5px', display: (index===0)? 'none' : 'inherit'}}
                        onClick={(e => {
                            writeData(index, this.state.data);
                            previousQuestion(); 
                            })}>Previous</button>
                </div>
                {(index !== numQuestions-1)?
                <div style={{position: "fixed", top: '610px', left: '620px'}}>
                    <button className='btn btn-primary' style={{width: '100px', padding: '5px'}}
                        disabled={!valid} 
                        onClick={(e => {
                            if (!valid)
                                return
                            writeData(index, this.state.data);
                            nextQuestion();
                            })}>Next</button>
                </div> :
                <div style={{position: "fixed", top: '610px', left: '620px'}}>
                    <button className='btn btn-primary' style={{width: '100px', padding: '5px'}}
                        disabled={!valid} 
                        onClick={(e => {
                            if (!valid)
                                return
                            writeData(index, this.state.data);
                            })}>Complete</button>
                </div>}
            </div>
        )
    }
}

class KeywordsInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawStr: "",
            data: [],
            valid: false
        };
    }

    updateSelection = e => {
        const { value } = e.target;
        var { question } = this.props;
        console.log(value);
        var words = value.split(',')
        if (words.length < question.maxLength) // make sure data is in range
        {
            this.setState({
                rawStr: value,
                data: words,
                valid: true
            });
        } else {
            this.setState({
                rawStr: value,
                data: [],
                valid: false
            });
        }
    }

    render() {
        const { question, index, nextQuestion, previousQuestion, writeData, numQuestions, uploadData } = this.props;
        const { valid } = this.state;
        const style = {
            margin: '25px',
            display: 'flex-box',
            position: 'relative'
        }
        console.log(`index ${index}`);
        return (
            <div>
                <h4>{question.prompt}</h4>
                <textarea
                    value={this.state.rawStr}
                    onChange={this.updateSelection}
                    placeholder={question.placeholder}
                    />

                <div style={{position: "fixed", top: '610px'}}>
                    <button className='btn btn-primary' 
                        style={{width: '100px', padding: '5px', display: (index===0)? 'none' : 'inherit'}}
                        onClick={(e => {
                            writeData(index, this.state.data);
                            previousQuestion(); 
                            })}>Previous</button>
                </div>
                {(index !== numQuestions-1)?
                <div style={{position: "fixed", top: '610px', left: '620px'}}>
                    <button className='btn btn-primary' style={{width: '100px', padding: '5px'}}
                        disabled={!valid} 
                        onClick={(e => {
                            if (!valid)
                                return
                            writeData(index, this.state.data);
                            nextQuestion();
                            })}>Next</button>
                </div> :
                <div style={{position: "fixed", top: '610px', left: '620px'}}>
                    <button className='btn btn-primary' style={{width: '100px', padding: '5px'}}
                        disabled={!valid} 
                        onClick={(e => {
                            if (!valid)
                                return
                            writeData(index, this.state.data);
                            uploadData()
                            })}>Complete</button>
                </div>}
            </div>
        )
    }
}