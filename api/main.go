package main

import (
  "fmt"
  "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Get("/ping", func(c *fiber.Ctx) error {
        return c.SendString("pong")
    })

    app.Listen(":3000")
    fmt.Println("REST API listening at http://localhost:3000")
}
