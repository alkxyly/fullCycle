FROM golang:1.8 as build-stage

WORKDIR /usr/src/app
COPY hello.go .
RUN go build -o hello .


FROM alpine:latest


COPY --from=build-stage /usr/src/app /bin

CMD hello