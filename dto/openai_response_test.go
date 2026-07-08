package dto

import (
	"testing"

	"github.com/QuantumNous/new-api/common"
)

func TestResponsesStreamResponseAcceptsObjectArguments(t *testing.T) {
	raw := `{
		"type": "response.output_item.done",
		"item": {
			"type": "function_call",
			"id": "fc_123",
			"call_id": "call_123",
			"name": "lookup",
			"arguments": {"query": "new-api", "limit": 3}
		}
	}`

	var resp ResponsesStreamResponse
	if err := common.Unmarshal([]byte(raw), &resp); err != nil {
		t.Fatalf("unexpected unmarshal error: %v", err)
	}
	if resp.Item == nil {
		t.Fatal("expected item to be parsed")
	}
	if resp.Item.Arguments != `{"limit":3,"query":"new-api"}` {
		t.Fatalf("unexpected arguments: %q", resp.Item.Arguments)
	}
}

func TestOpenAIResponsesResponseAcceptsObjectArguments(t *testing.T) {
	raw := `{
		"id": "resp_123",
		"output": [
			{
				"type": "function_call",
				"id": "fc_123",
				"call_id": "call_123",
				"name": "lookup",
				"arguments": {"query": "new-api"}
			}
		]
	}`

	var resp OpenAIResponsesResponse
	if err := common.Unmarshal([]byte(raw), &resp); err != nil {
		t.Fatalf("unexpected unmarshal error: %v", err)
	}
	if len(resp.Output) != 1 {
		t.Fatalf("expected 1 output, got %d", len(resp.Output))
	}
	if resp.Output[0].Arguments != `{"query":"new-api"}` {
		t.Fatalf("unexpected arguments: %q", resp.Output[0].Arguments)
	}
}
