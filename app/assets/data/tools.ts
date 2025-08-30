// TODO: Remove once the actual tools api is correct
import type { SystemToolCollectionDocument } from "~/lib/api";
export const data: SystemToolCollectionDocument = {
  data: [
    {
      type: "tools",
      attributes: {
        name: "nmap",
        cmd: "nmap",
        export_format: "xml",
        export_arguments: ["-oX", "-"],
        version_arg: "--version",
        variants: [
          {
            args: ["-sL", "{target}"],
            description: "List scan - just list targets",
            argument_definitions: [
              {
                name: "target",
                type: "string",
                required: true,
                description: "Target host or network to scan",
                default_value: null,
                placeholder: "192.168.1.0/24",
              },
            ],
          },
          {
            args: ["-sT", "-p", "{ports}", "{target}"],
            description: "TCP connect scan on specific ports",
            argument_definitions: [
              {
                name: "ports",
                type: "string",
                required: true,
                description:
                  "Ports to scan (single port, range, or comma-separated)",
                default_value: null,
                placeholder: "80,443,8080-8090",
              },
              {
                name: "target",
                type: "string",
                required: true,
                description: "Target host to scan",
                default_value: null,
                placeholder: "192.168.1.1",
              },
            ],
          },
          {
            args: ["-sS", "-p", "{ports}", "{target}"],
            description: "TCP SYN scan on specific ports",
            argument_definitions: [
              {
                name: "ports",
                type: "string",
                required: true,
                description:
                  "Ports to scan (single port, range, or comma-separated)",
                default_value: null,
                placeholder: "80,443,8080-8090",
              },
              {
                name: "target",
                type: "string",
                required: true,
                description: "Target host to scan",
                default_value: null,
                placeholder: "192.168.1.1",
              },
            ],
          },
          {
            args: ["-sV", "-p", "{ports}", "{target}"],
            description: "Service version detection",
            argument_definitions: [
              {
                name: "ports",
                type: "string",
                required: true,
                description: "Ports to scan for service detection",
                default_value: null,
                placeholder: "80,443,22,21",
              },
              {
                name: "target",
                type: "string",
                required: true,
                description: "Target host to scan",
                default_value: null,
                placeholder: "192.168.1.1",
              },
            ],
          },
          {
            args: ["-O", "{target}"],
            description: "OS detection",
            argument_definitions: [
              {
                name: "target",
                type: "string",
                required: true,
                description: "Target host for OS detection",
                default_value: null,
                placeholder: "192.168.1.1",
              },
            ],
          },
          {
            args: ["-A", "{target}"],
            description: "Aggressive scan",
            argument_definitions: [
              {
                name: "target",
                type: "string",
                required: true,
                description: "Target host for aggressive scan",
                default_value: null,
                placeholder: "192.168.1.1",
              },
            ],
          },
        ],
      },
    },

    {
      type: "tools",
      attributes: {
        name: "tshark",
        cmd: "tshark",
        export_format: "json",
        export_arguments: ["-T", "json"],
        version_arg: "--version",
        variants: [
          {
            args: [
              "-i",
              "{interface}",
              "-c",
              "{count}",
              "-a",
              "duration:{duration}",
            ],
            description: "Live capture with duration limit",
            argument_definitions: [
              {
                name: "interface",
                type: "string",
                required: true,
                description: "Network interface to capture from",
                default_value: null,
                placeholder: "eth0",
              },
              {
                name: "count",
                type: "number",
                required: true,
                description: "Number of packets to capture",
                default_value: null,
                placeholder: "100",
              },
              {
                name: "duration",
                type: "number",
                required: true,
                description: "Duration of capture in seconds",
                default_value: null,
                placeholder: "60",
              },
            ],
          },
          {
            args: ["-r", "{pcap_file}", "-a", "duration:{duration}"],
            description: "Read PCAP file with duration filter",
            argument_definitions: [
              {
                name: "pcap_file",
                type: "string",
                required: true,
                description: "Path to PCAP file to analyze",
                default_value: null,
                placeholder: "capture.pcap",
              },
              {
                name: "duration",
                type: "number",
                required: true,
                description: "Duration to analyze from start in seconds",
                default_value: null,
                placeholder: "300",
              },
            ],
          },
          {
            args: [
              "-r",
              "{pcap_file}",
              "-Y",
              "{filter}",
              "-a",
              "duration:{duration}",
            ],
            description: "Read PCAP with filter and duration limit",
            argument_definitions: [
              {
                name: "pcap_file",
                type: "string",
                required: true,
                description: "Path to PCAP file to analyze",
                default_value: null,
                placeholder: "capture.pcap",
              },
              {
                name: "filter",
                type: "string",
                required: true,
                description: "BPF filter expression",
                default_value: null,
                placeholder: "tcp.port == 80",
              },
              {
                name: "duration",
                type: "number",
                required: true,
                description: "Duration to analyze from start in seconds",
                default_value: null,
                placeholder: "300",
              },
            ],
          },
          {
            args: ["-i", "{interface}", "-a", "duration:{duration}"],
            description: "Live capture with duration limit only",
            argument_definitions: [
              {
                name: "interface",
                type: "string",
                required: true,
                description: "Network interface to capture from",
                default_value: null,
                placeholder: "eth0",
              },
              {
                name: "duration",
                type: "number",
                required: true,
                description: "Duration of capture in seconds",
                default_value: null,
                placeholder: "60",
              },
            ],
          },
        ],
      },
    },
    {
      type: "tools",
      attributes: {
        name: "ffuf",
        cmd: "ffuf",
        export_format: "json",
        export_arguments: ["-of", "json", "-o", "-"],
        version_arg: "-V",
        variants: [
          {
            args: ["-w", "{wordlist}", "-u", "{url}"],
            description: "Directory/file fuzzing",
            argument_definitions: [
              {
                name: "wordlist",
                type: "string",
                required: true,
                description: "Path to wordlist file",
                default_value: null,
                placeholder: "/usr/share/wordlists/dirb/common.txt",
              },
              {
                name: "url",
                type: "string",
                required: true,
                description: "Target URL to fuzz",
                default_value: null,
                placeholder: "https://example.com/FUZZ",
              },
            ],
          },
          {
            args: ["-w", "{wordlist}", "-u", "{url}", "-mc", "{match_codes}"],
            description: "Fuzzing with status code matching",
            argument_definitions: [
              {
                name: "wordlist",
                type: "string",
                required: true,
                description: "Path to wordlist file",
                default_value: null,
                placeholder: "/usr/share/wordlists/dirb/common.txt",
              },
              {
                name: "url",
                type: "string",
                required: true,
                description: "Target URL to fuzz",
                default_value: null,
                placeholder: "https://example.com/FUZZ",
              },
              {
                name: "match_codes",
                type: "string",
                required: true,
                description: "HTTP status codes to match (comma-separated)",
                default_value: null,
                placeholder: "200,301,302",
              },
            ],
          },
          {
            args: ["-w", "{wordlist}", "-u", "{url}", "-fs", "{filter_size}"],
            description: "Fuzzing with response size filtering",
            argument_definitions: [
              {
                name: "wordlist",
                type: "string",
                required: true,
                description: "Path to wordlist file",
                default_value: null,
                placeholder: "/usr/share/wordlists/dirb/common.txt",
              },
              {
                name: "url",
                type: "string",
                required: true,
                description: "Target URL to fuzz",
                default_value: null,
                placeholder: "https://example.com/FUZZ",
              },
              {
                name: "filter_size",
                type: "number",
                required: true,
                description: "Filter responses by size (bytes)",
                default_value: null,
                placeholder: "1234",
              },
            ],
          },
        ],
      },
    },
  ],
};
