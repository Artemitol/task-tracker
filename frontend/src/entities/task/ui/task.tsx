import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { TaskModel } from "../model/task-model"

type TaskProps = {
    task: TaskModel
}

export function Task({ task }: TaskProps) {
    return (
        <Card>
            <CardHeader>
                <Typography variant='h3'>{task.name}</Typography>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}
