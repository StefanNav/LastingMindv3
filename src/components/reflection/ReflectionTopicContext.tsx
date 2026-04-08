interface ReflectionTopicContextProps {
  topicName: string
  questionText: string | null // null = "Reflect freely"
}

export function ReflectionTopicContext({ topicName, questionText }: ReflectionTopicContextProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[8px] bg-lm-bg-reflection px-4 py-3">
      <p className="text-[13px] font-medium text-muted-foreground">
        Reflecting on {topicName}
      </p>
      {questionText ? (
        <p className="font-display text-[17px] font-normal leading-[1.5] text-foreground">
          {questionText}
        </p>
      ) : (
        <p className="text-[15px] italic leading-[1.5] text-foreground/70">
          Reflect freely
        </p>
      )}
    </div>
  )
}
