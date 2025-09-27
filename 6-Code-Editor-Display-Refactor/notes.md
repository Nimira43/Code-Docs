#### Iframe Issue

##### Issue

###### When submitting code (e.g. console.log(123)), the output failed to appear in the custom preview console. No runtime errors were thrown, and the bundler returned valid JavaScript

##### Root Cause

###### The iframe in the Preview component was being updated with srcdoc, and then immediately sent a postMessage containing the bundled code. However, the iframe was not yet fully loaded, so the message was lost

##### Resolution

###### Fix: Delay the postMessage until the iframe has finished loading

```
useEffect(() => {
  const iframeEl = iframe.current
  iframeEl.srcdoc = html

  const handleLoad = () => {
    iframeEl.contentWindow.postMessage(code, '*')
  }

  iframeEl.addEventListener('load', handleLoad)

  return () => {
    iframeEl.removeEventListener('load', handleLoad)
  }
}, [code])
```
