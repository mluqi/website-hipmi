<?php

namespace App\Http\Controllers;

use App\Models\LandingPageComponent;
use Illuminate\Http\Request;

class LandingPageComponentController extends Controller
{
    // GET /api/landing-page => ambil semua komponen dan group by section
    public function index()
    {
        $components = LandingPageComponent::orderBy('sort_order')->orderBy('id')->get()
            ->groupBy('section')
            ->map(function ($sectionItems) {
                // Return the full item, keyed by its key_name.
                // Assumes key_name is unique per section.
                return $sectionItems->mapWithKeys(function ($item) {
                    return [$item->key_name => $item];
                });
            });

        return response()->json($components);
    }

    // POST /api/landing-page => buat komponen baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'section'    => 'required|string|max:50',
            'key_name'   => 'required|string|max:50',
            'value'      => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            'type'       => 'required|in:text,image',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->type === 'image' && $request->hasFile('value')) {
            $filePath = $request->file('value')->store('landing', 'public');
            $validated['value'] = $filePath;
        }

        $component = LandingPageComponent::create($validated);

        return response()->json($component, 201);
    }

    // PUT /api/landing-page/{id} => update komponen
    public function update(Request $request, $id)
    {
        $component = LandingPageComponent::findOrFail($id);

        // Base validation rules
        $rules = [
            'section'    => 'sometimes|required|string|max:50',
            'key_name'   => 'sometimes|required|string|max:50',
            'type'       => 'required|in:text,image',
            'sort_order' => 'nullable|integer',
        ];

        // Conditional validation for 'value'
        if ($request->input('type') === 'image') {
            // If 'value' is present and it's a file, or if 'value' is explicitly set to null/empty (to clear image)
            if ($request->hasFile('value') || ($request->exists('value') && ($request->input('value') === null || $request->input('value') === ''))) {
                $rules['value'] = 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048'; // Added webp
            }
        } elseif ($request->input('type') === 'text') {
            // If 'value' is present for text type
            if ($request->exists('value')) {
                $rules['value'] = 'nullable|string';
            }
        }

        $validated = $request->validate($rules);

        // Handle image upload/deletion only if type is 'image' and 'value' was part of the validated data
        if ($validated['type'] === 'image' && array_key_exists('value', $validated)) {
            if ($request->hasFile('value')) {
                if ($component->type === 'image' && $component->value) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($component->value);
                }
            $filePath = $request->file('value')->store('landing', 'public');
            $validated['value'] = $filePath;
            } elseif ($validated['value'] === null || $validated['value'] === '') { // Explicitly clearing the image
                if ($component->type === 'image' && $component->value) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($component->value);
                }
                $validated['value'] = null; // Ensure it's set to null in the DB
            }
        }

        $component->update($validated);

        return response()->json($component);
    }


    // DELETE /api/landing-page/{id} => hapus komponen
    public function destroy($id)
    {
        $component = LandingPageComponent::findOrFail($id);
        $component->delete();

        return response()->json(['message' => 'Component deleted']);
    }
}
