import React from 'react'
import { Card, CardContent } from '@material-ui/core';

const AnswerOption = ({answerOption, handleClick}) =>  {
    
    return (
        <div onClick={(event) => handleClick(event)}>
            <Card>
                <CardContent>
                    {answerOption}
                </CardContent>      
            </Card>
        </div>
    )
}

export default AnswerOption
