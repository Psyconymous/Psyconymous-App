package main

import (
  "testing"
  "fmt"
  "net/http"
  "io/ioutil"
)

func TestPingServer(t *testing.T) {
  res, err := http.Get("http://localhost:3000/ping")
  body, err := ioutil.ReadAll(res.Body)

  if err != nil {
    fmt.Println(err)
    t.Fatal(err)
  } else if string(body) != "pong" {
    t.Fatal("could not get \"pong\"")
  }
}
