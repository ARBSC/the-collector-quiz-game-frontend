import React, { Component } from 'react'
import { Container, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import AnswerOption from './AnswerOption'
class QuestionCard extends Component {
    state = {
        title: "It's Game Time!",
        questionInfo: {},
        answerOptions: []

    }

    setAnswerOptions = (data) => {
        const answerOptions = data.incorrect_answers.concat([data.correct_answer]).sort()
        return answerOptions
    }

    getQuizQuestion = () => {
        fetch('https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple')
        .then(response => response.json())
        .then(data => {
            this.setState({
                questionInfo: data.results[0],
                answerOptions: this.setAnswerOptions(data.results[0])
            })
        })
        .catch( res => console.log(res));
        }

    componentDidMount = () => {
        this.getQuizQuestion()
    }

    render() {
        return (
            <div>
                <Container maxWidth="lg">
                    <Card>
                        <CardHeader title={this.state.title} />
                        <CardContent>
                            {this.state.questionInfo.question}
                        </CardContent>
                        <CardActions>
                            {this.state.answerOptions.map(answerOption => <AnswerOption answerOption={answerOption} />)}
                        </CardActions>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default QuestionCard
