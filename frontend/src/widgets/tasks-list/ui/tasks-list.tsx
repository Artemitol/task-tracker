import { useGetTasksQuery } from "@entities/task"

export function TasksList() {
    const { data } = useGetTasksQuery()

    console.log(data)

    return (
        <>
            {data?.map((el) => (
                <div key={crypto.randomUUID()}>
                    {el.name}
                    <img
                        src={`data:image/png;base64, ${el.executor.badgeUrl}`}
                        alt='imag'
                        width='100'
                        height='100'
                        loading='lazy'
                    />
                </div>
            ))}
        </>
    )
}
