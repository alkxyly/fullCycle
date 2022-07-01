FROM golang:alpine as builder

WORKDIR /usr/src/app

COPY hello.go .

RUN CGO_ENABLED=0 go build -o /app hello.go

FROM  scratch

COPY --from=builder /app /app

ENTRYPOINT [ "./app" ]