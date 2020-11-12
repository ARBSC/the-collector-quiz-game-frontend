import React from 'react'
import { Card, CardContent } from '@material-ui/core';

const AnswerOption = ({answerOption}) =>  {
    
    return (
        <div>
            <Card>
                <CardContent>
                    {answerOption}
                </CardContent>      
            </Card>
        </div>
    )
}

export default AnswerOption
