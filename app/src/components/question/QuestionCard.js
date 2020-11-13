import React, { Component } from 'react'
import { Container, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import AnswerOption from './AnswerOption'
class QuestionCard extends Component {
    state = {
        title: "It's Game Time!",
        questionInfo: {},
        answerOptions: [],
        imageURL: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053,strp/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDIwIiwicGF0aCI6IlwvZlwvNGY3NzA1ZWMtOGM0OS00ZWVkLWE1NmUtYzIxZjM5ODUyNTRjXC9kYWg0M2N5LWE4ZTEyMWNiLTkzNGEtNDBmNi05N2M3LWZhMmQ3NzEzMGRkNS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.6Au-hxTt7FuZ5paCMWMJrAiCi-ClaG35bEG2TgGg0VE'
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
    
    getReward = () => {
        fetch(`https://api.pokemontcg.io/v1/cards/xy7-${Math.floor(Math.random() * 10)}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                imageURL: data.card.imageUrlHiRes
            })
        })
        .catch( res => console.log(res));
        }

    handleClick = (event) => {
        console.log(event)
        console.log(event.target.innerHTML)
        if (event.target.innerHTML === this.state.questionInfo.correct_answer) {
            this.getReward()
            this.getQuizQuestion()
        }
        else {
            this.getQuizQuestion()
            this.resetCardImage()
        }
    }
    
    resetCardImage = () => {
        this.setState({imageURL: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053,strp/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDIwIiwicGF0aCI6IlwvZlwvNGY3NzA1ZWMtOGM0OS00ZWVkLWE1NmUtYzIxZjM5ODUyNTRjXC9kYWg0M2N5LWE4ZTEyMWNiLTkzNGEtNDBmNi05N2M3LWZhMmQ3NzEzMGRkNS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.6Au-hxTt7FuZ5paCMWMJrAiCi-ClaG35bEG2TgGg0VE'})
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
                            {this.state.answerOptions.map((answerOption, idx) => <AnswerOption key={idx} answerOption={answerOption} handleClick={this.handleClick} />)}
                        </CardActions>
                    </Card>
                    <img src={this.state.imageURL} alt="Card" width="500" height="600"></img>
                </Container>
            </div>
        )
    }
}

export default QuestionCard
