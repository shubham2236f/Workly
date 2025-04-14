import React from 'react'

const Summury = () => {
  return (
    <div>
      <div className="space-y-2">
        <Textarea
          placeholder={`Description of your ${type.toLowerCase()}`}
          className="h-32"
          {...register("description")}
          error={errors.description}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <Button
        type="button"
        size="sm"
        onClick={handleImproveDescription}
        disabled={isImproving || !watch("description")}
      >
        {isImproving ? (
          <>
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Improving...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Improve with AI
          </>
        )}
      </Button>
    </div>
  );
}

export default Summury