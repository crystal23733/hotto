package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello from Go!")
}

func main() {
	http.HandleFunc("/", helloHandler)
	fmt.Println("Server is running on port 5505")
	http.ListenAndServe(":5505", nil)
}
