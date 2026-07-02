# Analysis Tools

This folder contains utility scripts for analyzing and documenting the diagnostic software.

## Screenshot Analysis Tool

### Purpose
Recursively analyzes a screenshot folder to generate comprehensive documentation with:
- Hierarchical directory tree structure
- AI-powered feature descriptions for each screenshot
- Organized Markdown report suitable for documentation

### Prerequisites

1. **Google API Key** (for Gemini vision analysis)
   - Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Set environment variable: `GOOGLE_API_KEY=your_key_here`

2. **Dependencies installed**
   ```bash
   npm install
   ```

### Usage

#### Quick Start
```bash
npm run analyze:screenshots
```

#### Custom Screenshot Folder
```bash
npm run analyze:screenshots C:\path\to\screenshots
```

#### Windows PowerShell
```powershell
$env:GOOGLE_API_KEY="your-api-key-here"
npm run analyze:screenshots
```

### Output

Creates `analysis-report.md` in project root containing:
- Directory tree structure
- AI-generated 2-3 line descriptions for each screenshot
- Organized by folder with statistics
- Reference information for cloud migration planning

### Cache Management

Analysis results are cached in `.analysis-cache.json` to:
- Avoid redundant API calls
- Speed up subsequent runs
- Track which images have been analyzed

To clear cache and re-analyze all images:
```bash
rm tools/.analysis-cache.json
npm run analyze:screenshots
```

### Configuration

Environment variables:
- `GOOGLE_API_KEY` — Gemini API key (required for AI analysis)
- Screenshot folder path — Pass as command argument or defaults to attached folder

### Cost Estimate

- Free tier: 15 requests/minute for Gemini API
- 65 screenshots: ~5-10 minutes to analyze
- Cost: Typically free under Google's free tier usage limits

### Review & Refinement

After running the tool:

1. **Open** `analysis-report.md`
2. **Review** the AI-generated descriptions
3. **Refine** descriptions by editing the markdown directly
4. **Add** additional context or details as needed
5. **Save** for documentation and cloud migration planning

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not found" | Set `GOOGLE_API_KEY` environment variable |
| "Screenshot folder not found" | Check path exists or pass correct path as argument |
| "Unable to analyze image" | Check image is valid PNG, retry with fresh API key |
| Rate limiting | Tool automatically throttles; try again after brief delay |

### Architecture

The tool:
1. **Scans** the target directory recursively
2. **Indexes** all PNG files and folder structure
3. **Calls** Google's Gemini 2.0 Flash model for each image
4. **Caches** results locally to avoid re-analysis
5. **Generates** formatted Markdown report with all data

